package com.dsaa.neuway2;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class allPathsDFS {
    // Map graph -- neuMap (adjacency List)
    static void dfsAllPaths(Map<String, List<MainDijkstrasAlgo.Edge>> graph,
                        String current, //node the DFS is currently visiting 
                        String destination, //target node we want to reach
                        Set<String> visited, //keeps track of nodes already in current path
                        List<String> path, //sequence of nordes from start to target destination
                        List<List<String>> allPaths, //stores copies of every complete path
                        Map<List<String>, Integer> allDist, //stores (allPaths, totaldistance)
                        int curDist) {

    visited.add(current); //removes redundancy o visited nodes
    path.add(current); //append to ongoiung path sequence

    // If destination reached, store copy of the path
    if (current.equals(destination)) {
        List<String> completePath = new ArrayList<>(path); //String collector for each complete paths
        allPaths.add(new ArrayList<>(completePath)); //another route
        allDist.put(completePath, curDist);
    } else {
        // Explore neighbors
        for (MainDijkstrasAlgo.Edge e : graph.getOrDefault(current, new ArrayList<>())) {
            if (!visited.contains(e.target)) {
                dfsAllPaths(graph, e.target, destination, visited, path, allPaths, allDist, curDist + e.travelDistance);
            }
        }
    }
 
    // BACKTRACK 
    visited.remove(current);
    path.remove(path.size() - 1);
    }
}