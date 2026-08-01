'use client';

import React, { useState } from 'react';

interface Node {
  id: string;
  label: string;
  type: 'root' | 'vertical' | 'sub';
  x: number;
  y: number;
  parent?: string;
  description?: string;
}

export default function Ecosystem() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Nodes placed in a responsive, elegant grid layout
  const nodes: Node[] = [
    // Root
    { id: 'group', label: 'Paidhu Group', type: 'root', x: 400, y: 50, description: 'Parent holding driving innovation and sustainability' },
    
    // Verticals
    { id: 'foods', label: 'Paidhu Ethical Foods', type: 'vertical', x: 130, y: 180, parent: 'group', description: 'Ethical sourcing & healthy living solutions' },
    { id: 'floffi', label: 'Floffi', type: 'vertical', x: 310, y: 180, parent: 'group', description: 'Premium fruit jams & natural preserves' },
    { id: 'viyara', label: 'Viyara', type: 'vertical', x: 490, y: 180, parent: 'group', description: 'Next-gen IT and digital transformation solutions' },
    { id: 'kalika', label: 'Kalika Sphere', type: 'vertical', x: 670, y: 180, parent: 'group', description: 'Future-ready education & skills platforms' },

    // Sub-brands / Offerings
    { id: 'flowers', label: 'Edible Flowers', type: 'sub', x: 70, y: 310, parent: 'foods', description: 'Premium organic edible flower variations' },
    { id: 'cookies', label: 'Bloom Cookies', type: 'sub', x: 130, y: 360, parent: 'foods', description: 'Healthy and premium cookies' },
    { id: 'saffron', label: 'Premium Saffron', type: 'sub', x: 190, y: 310, parent: 'foods', description: 'Pure Kashmir saffron extracts' },

    { id: 'jams', label: 'Fruit Jams', type: 'sub', x: 280, y: 320, parent: 'floffi', description: '100% natural, preservative-free jams' },
    { id: 'spreads', label: 'Fruit Spreads', type: 'sub', x: 340, y: 320, parent: 'floffi', description: 'Low sugar, fruit-rich spreads' },

    { id: 'software', label: 'Software & AI', type: 'sub', x: 460, y: 320, parent: 'viyara', description: 'Custom SaaS, cloud & AI models' },
    { id: 'apps', label: 'Mobile Apps', type: 'sub', x: 520, y: 320, parent: 'viyara', description: 'Tailored Android and iOS applications' },

    { id: 'education', label: 'Digital Learning', type: 'sub', x: 640, y: 320, parent: 'kalika', description: 'Modern skill development programs' },
    { id: 'skills', label: 'Future Skills', type: 'sub', x: 700, y: 320, parent: 'kalika', description: 'Corporate & technology training' },
  ];

  // Helper to determine if a path/line should be highlighted
  const isLineHighlighted = (fromId: string, toId: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode === fromId || hoveredNode === toId) return true;
    
    // Highlight lines all the way to root if sub-node is hovered
    const node = nodes.find(n => n.id === hoveredNode);
    if (node && node.parent === fromId && fromId === 'group') return true;
    if (node && node.id === toId && node.parent === fromId) return true;
    
    return false;
  };

  return (
    <div className="w-full bg-[#FFFFFF]/30 dark:bg-[#1A1A1A]/30 backdrop-blur-md border border-gray-200/20 dark:border-gray-800/20 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent-gold/5 pointer-events-none" />
      
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">Interactive Architecture</span>
        <h3 className="text-3xl font-serif mt-2 mb-3 text-primary dark:text-secondary">Group Ecosystem</h3>
        <p className="text-sm max-w-lg mx-auto opacity-70">
          Hover over nodes to explore connecting relationships across food, technology, and learning sectors.
        </p>
      </div>

      <div className="relative w-full overflow-x-auto select-none">
        <div className="min-w-[800px] h-[420px] mx-auto relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 420">
            {/* Connection Lines */}
            {nodes.map(node => {
              if (!node.parent) return null;
              const parentNode = nodes.find(n => n.id === node.parent);
              if (!parentNode) return null;

              const highlighted = isLineHighlighted(parentNode.id, node.id);

              return (
                <g key={`link-${node.id}`}>
                  {/* Background shadow line */}
                  <path
                    d={`M ${parentNode.x} ${parentNode.y} C ${parentNode.x} ${(parentNode.y + node.y) / 2}, ${node.x} ${(parentNode.y + node.y) / 2}, ${node.x} ${node.y}`}
                    fill="none"
                    stroke={highlighted ? '#C79B36' : 'currentColor'}
                    strokeWidth={highlighted ? '3' : '1.5'}
                    className={`transition-all duration-500 opacity-25 ${highlighted ? 'opacity-80 drop-shadow-[0_0_8px_#C79B36]' : 'text-gray-300 dark:text-gray-700'}`}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map(node => {
            const isHovered = hoveredNode === node.id;
            const isParentHovered = hoveredNode && nodes.find(n => n.id === hoveredNode)?.parent === node.id;
            const isChildHovered = hoveredNode && node.parent === hoveredNode;
            
            let colorClasses = '';
            if (node.type === 'root') {
              colorClasses = isHovered 
                ? 'bg-primary text-white border-accent-gold ring-4 ring-accent-gold/20 scale-105' 
                : 'bg-primary text-white border-primary/20 hover:scale-102';
            } else if (node.type === 'vertical') {
              colorClasses = (isHovered || isParentHovered || isChildHovered)
                ? 'bg-[#FFFFFF] dark:bg-dark text-[#C79B36] border-accent-gold shadow-lg scale-105'
                : 'bg-[#FFFFFF] dark:bg-dark text-primary dark:text-secondary border-gray-200/50 dark:border-gray-800 hover:scale-102';
            } else {
              colorClasses = (isHovered || isParentHovered)
                ? 'bg-[#FFFFFF] dark:bg-dark text-accent-gold border-accent-gold scale-105'
                : 'bg-[#FFFFFF] dark:bg-dark text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:scale-102';
            }

            return (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer text-center font-button text-xs font-medium tracking-wide z-10 ${colorClasses}`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {node.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Panel Details */}
      <div className="mt-8 border-t border-gray-200/10 pt-6 min-h-[70px] text-center transition-all duration-300">
        {hoveredNode ? (
          <div>
            <h4 className="text-accent-gold font-serif text-lg font-semibold">
              {nodes.find(n => n.id === hoveredNode)?.label}
            </h4>
            <p className="text-sm opacity-80 mt-1">
              {nodes.find(n => n.id === hoveredNode)?.description}
            </p>
          </div>
        ) : (
          <p className="text-sm opacity-50 italic">
            Hover over any node in the diagram to inspect its role inside the Paidhu Group ecosystem.
          </p>
        )}
      </div>
    </div>
  );
}
