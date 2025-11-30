package com.dsaa.neuway2;

import org.springframework.web.bind.annotation.*;

import com.dsaa.neuway2.DTOs.DijkstraRequest;
import com.dsaa.neuway2.DTOs.DijkstraResult;

import java.util.*;

@RestController
@RequestMapping("/dijkstra")
public class DijkstraController {

    private final Map<String, List<MainDijkstrasAlgo.Edge>> neuMap = new HashMap<>();

    public DijkstraController() {
        MainDijkstrasAlgo.addEdge(neuMap, "A", "B", 260);
        MainDijkstrasAlgo.addEdge(neuMap, "A", "D", 350);
        MainDijkstrasAlgo.addEdge(neuMap, "A", "C", 250);
        MainDijkstrasAlgo.addEdge(neuMap, "A", "G", 500);
        MainDijkstrasAlgo.addEdge(neuMap, "B", "C", 190);
        MainDijkstrasAlgo.addEdge(neuMap, "B", "F", 100);
        MainDijkstrasAlgo.addEdge(neuMap, "B", "D", 180);
        MainDijkstrasAlgo.addEdge(neuMap, "C", "F", 80);
        MainDijkstrasAlgo.addEdge(neuMap, "D", "G", 200);
        MainDijkstrasAlgo.addEdge(neuMap, "D", "E", 350);
    }

    @GetMapping
    public DijkstraResult computePathGet(@RequestParam String start, @RequestParam String destination) {
        MainDijkstrasAlgo.Result result = MainDijkstrasAlgo.computeDijkstra(neuMap, start.toUpperCase(), destination.toUpperCase());
        return new DijkstraResult(result.path, result.totalDistance, result.operations);
    }

    @PostMapping
    public DijkstraResult computePathPost(@RequestBody DijkstraRequest request) {
        MainDijkstrasAlgo.Result result = MainDijkstrasAlgo.computeDijkstra(neuMap, request.getStart().toUpperCase(), request.getDestination().toUpperCase());
        return new DijkstraResult(result.path, result.totalDistance, result.operations);
    }
}
