import * as d3             from "d3";
import {AnonymousFunction} from "constants/types/anonymousFunction";
import {capitalize}        from "lodash";

/**
 * Prepares a color palette factory function
 * @param {string[]} domains
 */
export function setColorPaletteFactory(domains: string[]) {
  return d3.scaleOrdinal().domain(domains).range(d3.schemeTableau10);
}

/**
 * Prepares a size scale factory function
 * @param {number} max - Maximum size
 * @param {number[]} customRange - Change the default wide (in px) for our scale
 */
export function setSizeScaleFactory(max: number, customRange?: number[]) {
  return d3.scaleLinear().domain([0, max]).range(customRange || [15, 18]);
}

/**
 * Prepares the features of the forces applied to the nodes
 * @param containerWidth
 * @param containerHeight
 */
export function setSimulationFactory(containerWidth: number, containerHeight: number, sizeScaleFactory: AnonymousFunction) {
  return d3.forceSimulation()
    .force("center", d3.forceCenter().x(containerWidth / 2).y(containerHeight / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.2).radius( // @ts-ignore
      d => sizeScaleFactory(d.length) + 3
    ).iterations(1)); // Force that avoids circle overlapping
}

/**
 * When the user starts to drag a circle
 * TODO: find why it freezing when uses this function
 * @param simulation
 */
export function onDragStarted(simulation: any) {
  return (event: any, d: any) => {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  };
}

/**
 * When a circle is dragged
 * @param event
 * @param d
 */
export function onDragged(event: any, d: any) {
  d.fx = event.x;
  d.fy = event.y;
}

/**
 * When the user ends to drag a circle
 * TODO: find why it freezing when uses this function
 * @param simulation
 */
export function onDragEnd(simulation: any) {
  return (event: any, d: any) => {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  };
}

export function parseCountryData([key, value]: [string, any[]]) {
  return {
    key,
    label: capitalize(value?.[0]?.["Country name"]),
    value: value.length,
    countryCode: key,
  };
}

export function parseRegionData([key, value]: [string, any[]]) {
  return {
    key,
    label: capitalize(key),
    value: value.length,
    countryCode: value?.[0]?.["Country code"],
  };
}
