package com.dsaa.neuway2;

import java.util.*;

public class MainDijkstrasAlgo {

    public static class Edge {
        String target;
        int travelDistance;

        public Edge(String target, int travelDistance) {
            this.target = target;
            this.travelDistance = travelDistance;
        }
    }

    public static class Result {
        public String path;
        public int totalDistance;
        public int operations;

        public Result(String path, int totalDistance, int operations) {
            this.path = path;
            this.totalDistance = totalDistance;
            this.operations = operations;
        }
    }

    public static void addEdge(Map<String, List<Edge>> map, String from, String to, int dist) {
        map.putIfAbsent(from, new LinkedList<>());
        map.get(from).add(new Edge(to, dist));

        map.putIfAbsent(to, new LinkedList<>());
        map.get(to).add(new Edge(from, dist));
    }

    public static Result computeDijkstra(Map<String, List<Edge>> neuMap, String start, String destination) {
        Map<String, Integer> distances = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        PriorityQueue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.travelDistance));
        int operations = 0;

        Set<String> allNodes = new HashSet<>();
        for (Map.Entry<String, List<Edge>> entry : neuMap.entrySet()) {
            allNodes.add(entry.getKey());
            for (Edge e : entry.getValue()) allNodes.add(e.target);
        }

        for (String node : allNodes) distances.put(node, Integer.MAX_VALUE);
        distances.put(start, 0);
        pq.add(new Edge(start, 0));

        while (!pq.isEmpty()) {
            Edge current = pq.poll();
            operations++;

            if (current.travelDistance > distances.get(current.target)) continue;

            List<Edge> neighbors = neuMap.getOrDefault(current.target, new LinkedList<>());
            for (Edge neighbor : neighbors) {
                int newDist = distances.get(current.target) + neighbor.travelDistance;
                if (newDist < distances.get(neighbor.target)) {
                    distances.put(neighbor.target, newDist);
                    previous.put(neighbor.target, current.target);
                    pq.add(new Edge(neighbor.target, newDist));
                }
            }
        }

        if (!distances.containsKey(destination) || distances.get(destination) == Integer.MAX_VALUE)
            return new Result("No path", Integer.MAX_VALUE, operations);

        LinkedList<String> pathNodes = new LinkedList<>();
        String currentNode = destination;
        while (currentNode != null && previous.containsKey(currentNode)) {
            pathNodes.addFirst(currentNode);
            currentNode = previous.get(currentNode);
        }
        pathNodes.addFirst(start);

        return new Result(String.join(" -> ", pathNodes), distances.get(destination), operations);
    }
}
