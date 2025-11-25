"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EngravedStatue } from "@/components/EngravedStatue";
import { KnowledgeNode } from "@/components/KnowledgeNode";
import { FogPanel } from "@/components/core/FogPanel";
import { ContextPanel } from "@/components/ContextPanel";
import { Main } from "@/components/Main";

interface Node {
  id: string;
  type: "idea" | "lesson" | "test" | "definition" | "quote" | "cluster";
  title: string;
  content?: string;
  x: number;
  y: number;
}

export default function ScholarivmPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKnowledgeGraph();
  }, []);

  const fetchKnowledgeGraph = async () => {
    try {
      // Fetch concepts from memoria and feed to create nodes
      const [memoriaRes, feedRes] = await Promise.all([
        fetch("/api/memoria"),
        fetch("/api/feed?date=" + new Date().toISOString().split("T")[0]),
      ]);

      const memoriaData = await memoriaRes.json();
      const feedData = await feedRes.json();

      const newNodes: Node[] = [];

      // Add nodes from memoria concepts
      if (memoriaData.allConcepts) {
        memoriaData.allConcepts.slice(0, 5).forEach((concept: any, index: number) => {
          newNodes.push({
            id: `idea-${concept.id}`,
            type: "idea",
            title: concept.title,
            content: concept.explanation,
            x: 100 + index * 150,
            y: 200 + (index % 2) * 150,
          });

          if (concept.micro_question) {
            newNodes.push({
              id: `test-${concept.id}`,
              type: "test",
              title: concept.micro_question,
              content: concept.micro_answer,
              x: 100 + index * 150 + 80,
              y: 200 + (index % 2) * 150 + 100,
            });
          }
        });
      }

      // Add nodes from feed items
      if (feedData.feed) {
        feedData.feed.slice(0, 3).forEach((item: any, index: number) => {
          newNodes.push({
            id: `lesson-${item.id}`,
            type: "lesson",
            title: item.title,
            content: item.content,
            x: 400 + index * 180,
            y: 300 + index * 120,
          });
        });
      }

      setNodes(newNodes);
    } catch (error) {
      console.error("Error fetching knowledge graph:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNodeDrag = (id: string, x: number, y: number) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, x, y } : node))
    );
  };

  if (loading) {
    return (
      <>
        <Main>
          <FogPanel className="card-padding">
            <div className="font-mono text-sm text-muted-foreground">
              Loading knowledge graph...
            </div>
          </FogPanel>
        </Main>
        <ContextPanel title="Knowledge Graph">
          <div className="font-mono text-xs text-muted-foreground">Loading...</div>
        </ContextPanel>
      </>
    );
  }

  return (
    <>
      <Main className="scroll-fade-top scroll-fade-bottom">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 section-spacing"
        >
          <h1 className="font-serif text-[64px] font-normal tracking-[0.08em] uppercase mb-4 fade-fog-in">
            SCHOLARIVM
          </h1>
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            Knowledge Graph & Concept Mapping
          </p>
        </motion.div>

        {/* Knowledge Graph Canvas */}
        <div className="relative min-h-[800px] mb-16">
          {/* Central Engraving */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="opacity-30">
              <EngravedStatue
                imageSrc="/images/classical/lady-justice.jpg"
                alt="Lady Justice"
                size="md"
                glow
              />
            </div>
          </div>

          {/* Floating Knowledge Nodes */}
          <div className="relative z-10">
            {nodes.map((node) => (
              <KnowledgeNode
                key={node.id}
                id={node.id}
                type={node.type}
                title={node.title}
                content={node.content}
                x={node.x}
                y={node.y}
                onDrag={handleNodeDrag}
              />
            ))}
          </div>

          {/* Graphite-style Line Connectors */}
          <svg
            className="absolute inset-0 pointer-events-none z-0"
            style={{ opacity: 0.3 }}
          >
            {nodes.map((node, index) => {
              if (index === 0) return null;
              const prevNode = nodes[index - 1];
              return (
                <line
                  key={`line-${prevNode.id}-${node.id}`}
                  x1={prevNode.x + 128}
                  y1={prevNode.y + 60}
                  x2={node.x + 128}
                  y2={node.y + 60}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              );
            })}
          </svg>
        </div>

        {/* Instructions */}
        <FogPanel className="card-padding">
          <div className="font-serif text-lg mb-4 engraved engrave">
            Instructions
          </div>
          <div className="font-mono text-sm text-muted-foreground space-y-2">
            <p>• Drag nodes to reposition them on the canvas</p>
            <p>• Nodes represent key ideas, lessons, tests, and concepts</p>
            <p>• Connections show relationships between concepts</p>
            <p>• The central engraving represents the core knowledge system</p>
          </div>
        </FogPanel>
      </Main>

      <ContextPanel title="Knowledge Graph">
        <FogPanel className="card-padding mb-4">
          <div className="font-serif text-sm mb-2 engraved">Node Types</div>
          <div className="font-mono text-xs space-y-1">
            <div>• Key Idea</div>
            <div>• Micro-Lesson</div>
            <div>• Micro-Test</div>
            <div>• Definition</div>
            <div>• Quote</div>
            <div>• Concept Cluster</div>
          </div>
        </FogPanel>

        <FogPanel className="card-padding mb-4">
          <div className="font-serif text-sm mb-2 engraved">Statistics</div>
          <div className="font-mono text-xs space-y-1">
            <div>Total Nodes: {nodes.length}</div>
            <div>Ideas: {nodes.filter((n) => n.type === "idea").length}</div>
            <div>
              Lessons: {nodes.filter((n) => n.type === "lesson").length}
            </div>
            <div>Tests: {nodes.filter((n) => n.type === "test").length}</div>
          </div>
        </FogPanel>

        <FogPanel className="card-padding">
          <div className="font-serif text-sm mb-2 engraved">Actions</div>
          <div className="font-mono text-xs text-muted-foreground space-y-2">
            <p>• Drag to reposition</p>
            <p>• Click to view details</p>
            <p>• Connect related concepts</p>
          </div>
        </FogPanel>
      </ContextPanel>
    </>
  );
}
