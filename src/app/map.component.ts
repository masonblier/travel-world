import { Component, Input, ElementRef, TemplateRef, Renderer, ViewChild } from '@angular/core';
var d3: any = require('d3');
var topojson: any = require('topojson');
var d3GeoTile: any = require('d3.geoTile');

@Component({
  selector: 'map-component',
  template: `<div #someVar class="test"></div>`,
})
export class MapComponent  {
  @Input('data') listData: Array<any>;
  @ViewChild('someVar') el:ElementRef;

  width: number = 0;
  height: number = 0;
  globe: any = null;
  land: any = null;
  countries: any = null;
  borders: any = null;
  projection: any = null;
  c: CanvasRenderingContext2D = null;

  constructor(
    private rd: Renderer) { }

  ngAfterViewInit() {
    this.initD3(this.el.nativeElement);
  }

  ngOnChanges(changes: any) {
    if (changes.listData) {
      setTimeout(() => this.renderGlobe(), 1);
    }
  }

  initD3(container: Element) {
    var width = this.width = Math.max(960, window.innerWidth),
        height = this.height = Math.max(500, window.innerHeight) * 0.6;
        // prefix = prefixMatch(["webkit", "ms", "Moz", "O"]);

    var cx = width / 2;
    var cy = height / 2;
    var tile = d3GeoTile()
        .size([width, height]);
    // var projection = d3.geoMercator();
    this.projection = d3.geoOrthographic()
      .translate([cx, cy])
      .scale(width / 4)
      .clipAngle(90)
      .precision(0.6);

    var zoomed = () => {
      if (d3.event) {
        this.projection
          // .rotate([d3.event.transform.x / 100.0, d3.event.transform.y / 100.0])
          .scale(d3.event.transform.k)
          // .translate([d3.event.transform.x + cx, d3.event.transform.y + cy]);
      }

      this.renderGlobe();
    };

    var d0: number[] = [];
    var o0: number[] = [];
    var dragStart = () => {
      var r = this.projection.rotate();
      d0 = [d3.event.x, d3.event.y];
      o0 = [r[0], r[1]];
    };
    var dragged = () => {
      if (d3.event) {
        this.projection
          .rotate([o0[0] - (d0[0] - d3.event.x) / 10.0, o0[1] + (d0[1] - d3.event.y) / 10.0])
      }
      this.renderGlobe();
    };

    var zoom = d3.zoom()
        .scaleExtent([width / 4, width])
        .on("zoom", zoomed);
    var drag = d3.drag()
        .on("start", dragStart)
        .on("drag", dragged);

    var map = d3.select(container)
      .attr("class", "map-container")
      .style("width", width + "px")
      .style("height", height + "px")
      .call(drag)
      .call(zoom);

    var canvas = map.append("canvas")
        .attr("width", width)
        .attr("height", height);
    this.c = canvas.node().getContext("2d");

    var zoomTransform = d3.zoomTransform(container)
      .scale(width / 2 - 20)
      .translate([width / 2, height / 2]);

    var layer = map.append("div")
      .attr("class", "layer");

    d3.json("world-110m.json", (error: any, world: any) => {
      this.globe = {type: "Sphere"};
      this.land = topojson.feature(world, world.objects.land);
      this.countries = topojson.feature(world, world.objects.countries).features;
      this.borders = topojson.mesh(world, world.objects.countries, function(a: any, b: any) { return a !== b; });

      zoomed();
    });
  }

  renderGlobe() {
    var projectPath = d3.geoPath()
        .projection(this.projection)
        .context(this.c);

    this.c.clearRect(0, 0, this.width, this.height);
    this.c.fillStyle = "#ccc", this.c.beginPath(), projectPath(this.land), this.c.fill();
    // this.c.fillStyle = "#f00", this.c.beginPath(), projectPath(countries[i]), c.fill();
    this.c.strokeStyle = "#fff", this.c.lineWidth = .5, this.c.beginPath(), projectPath(this.borders), this.c.stroke();
    this.c.strokeStyle = "#000", this.c.lineWidth = 2, this.c.beginPath(), projectPath(this.globe), this.c.stroke();

    if (this.listData) {
      // var shortP = d3.geoPath().projection(this.projection);
      this.c.fillStyle = "#0cf";
      this.listData.forEach((city) => {
        this.c.beginPath(), projectPath({type: 'Point', coordinates: city.coordinates}), this.c.fill();
      });

      // var shortP = d3.geoPath().projection(this.projection);
      this.c.strokeStyle = "#0fa";
      var lastCoordinates = this.listData[this.listData.length - 1].coordinates;
      this.listData.forEach((city, index) => {
        this.c.beginPath();
        var prevCoordinates: number[] = (index === 0 ?
          lastCoordinates :
          this.listData[index - 1].coordinates);
        projectPath({type: 'LineString', coordinates: [city.coordinates, prevCoordinates]});
        this.c.stroke();
      });
    }
  }
}
