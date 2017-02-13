import { Directive, Input, ElementRef, TemplateRef, Renderer, ContentChild, ViewContainerRef } from '@angular/core';
import * as d3 from 'd3';

/**
 * Add the d3 content to the DOM
 */
@Directive({ selector: '[mapDirective]'})
export class MapDirective {
  private hasView = false;

  constructor(
    private el: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  ngOnInit() {
    console.log('templateRef', this.templateRef)
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  ngAfterViewInit() {
    console.log('child?', this.el)
  }

  @Input() set mapDirective(condition: string) {
    const width = 500, height = 500;

    console.log(this.el)
    d3.select(".map-directive-el").append("div")
      .attr("class", "map-container")
      .style("width", width + "px")
      .style("height", height + "px")
      // .call(zoom)
      // .on("mousemove", mousemoved);
  }
}
