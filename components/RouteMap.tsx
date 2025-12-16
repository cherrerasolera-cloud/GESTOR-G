import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { RoutePoint } from '../types';

interface RouteMapProps {
  points: RoutePoint[];
}

export const RouteMap: React.FC<RouteMapProps> = ({ points }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || points.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = 400;
    const padding = 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - padding, padding]);

    // Draw Connections (Simulated Route)
    const lineGenerator = d3.line<RoutePoint>()
      .x(d => xScale(d.lng))
      .y(d => yScale(d.lat))
      .curve(d3.curveCatmullRom.alpha(0.5));

    // Simple sorting to simulate a path: Depot -> Closest -> ... -> Depot
    const pathPoints = [...points].sort((a, b) => a.lng - b.lng); // Dummy sort logic for demo
    
    // Path
    svg.append("path")
      .datum(pathPoints)
      .attr("fill", "none")
      .attr("stroke", "#D4AF37") // Gold Color
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("d", lineGenerator)
      .attr("opacity", 0)
      .transition()
      .duration(1500)
      .attr("opacity", 1);

    // Nodes
    const groups = svg.selectAll("g")
      .data(points)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${xScale(d.lng)}, ${yScale(d.lat)})`);

    // Node Circle
    groups.append("circle")
      .attr("r", d => d.type === 'depot' ? 10 : 6)
      .attr("fill", d => d.type === 'depot' ? '#10b981' : '#18181b')
      .attr("stroke", d => d.type === 'depot' ? '#10b981' : '#D4AF37') // Gold border for points
      .attr("stroke-width", 2)
      .attr("class", "cursor-pointer transition-all hover:scale-125");

    // Labels
    groups.append("text")
      .text(d => d.type === 'generator' ? `${d.demandKg}kg` : 'Base')
      .attr("dy", -15)
      .attr("text-anchor", "middle")
      .attr("fill", "#9ca3af")
      .attr("font-size", "10px")
      .attr("font-family", "JetBrains Mono");

  }, [points]);

  return (
    <div className="w-full bg-surface border border-border rounded-xl overflow-hidden relative shadow-lg">
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded-md border border-border text-xs text-gray-300 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
        Simulación VRP (Vehicle Routing Problem)
      </div>
      <svg ref={svgRef} className="w-full h-[400px] block bg-gradient-to-b from-surface to-background" />
    </div>
  );
};