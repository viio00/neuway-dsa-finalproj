import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Scanner;
import java.util.Set;

//add reversed paths and switch case (input)
public class MainDijkstrasAlgo {
    static class Edge { 
    //Helper class for edges 
    //Edges -- the connections between nodes (or vertices) in a graph, 
    // and they represent the cost or weight of traveling between them

        String target; //the edge that leads to this location (curNode points to target)
        int travelDistance; //the weight (cost) of travelling through this edge 

        Edge(String target, int travelDistance) {
            this.target = target;
            this.travelDistance = travelDistance;
        }
    }

    public static class Result { //holds the final output
        String path; 
        public int totalDistance;
        int operations; 
        // this is to count no. of to determine how many steps algo is executed
        //for analysis rather than solving a problem or something in the program

        Result (String path, int totalDistance, int operations) {
            this.path = path;
            this.totalDistance = totalDistance;
            this.operations = operations;
        }
    }

    //dijkstra method
    static Result dijkstra(Map<String, List<Edge>> neuMap, String start, String destination) {
        Map<String, Integer> distances = new HashMap<>();
        //number of operations performed
        Map<String, String> previous = new HashMap<>();
        //keeps predecessor to reconstruct the path later

        PriorityQueue<Edge> distNode = new PriorityQueue<>(Comparator.comparingInt(e -> e.travelDistance));
        //returns the node w smallest distance
        //Sots based on travelDistance (from class Edge)
        int operations = 0;

        Set<String> allNodes = new HashSet<>();
        //map.Entry gets both Key and Value 
        for (Map.Entry<String, List<Edge>> entry : neuMap.entrySet()) { //neuMap contains adjaceny set
            allNodes.add(entry.getKey());
            for (Edge e : entry.getValue()) {
                allNodes.add(e.target);
            }
        }

        // Initialize distances to infinity
        for (String node : allNodes) {
            distances.put(node, Integer.MAX_VALUE);
        }

        distances.put(start, 0); //node initialization start = 0
        distNode.add(new Edge(start, 0)); //add start to pq 

        if (start.equals(destination)) { //Check if (start to destination) it loops to itself
            List<Edge> selfLoop = neuMap.getOrDefault(start, new LinkedList<>());
            for (Edge e : selfLoop) { 
                if (e.target.equals((start))) {
                    return new Result (start + "->" + destination, e.travelDistance, operations + 1);
                } 
            } 

            return new Result (start, 0, operations+1);
        }

        //While pq is not empty, get edge with smallest distance
        while (!distNode.isEmpty()) { 
            Edge current = distNode.poll();
            operations++; 

            //skip outaded entires
            if (current.travelDistance > distances.get(current.target)) continue;

            //get neighbors of current nodes
            List<Edge> neighbors = neuMap.getOrDefault(current.target, new LinkedList<>());

            //Relaxation d[v] = d[u] + c(u,v)
            /*
            If (d[u] + c(u,v) < d[v]) then update d[v]
            u -> the current node we are processing
            v -> one of its neighbors
            d[u] -> the current shortest distance from the start to u
            c(u, v) -> the cost of edge from u (weight) to v (distance)
            d[v] -> the current shortest known distnce from the start to v
            */
            for (Edge neighbor : neighbors) {
                int newDist = distances.get(current.target) + neighbor.travelDistance;

                if (newDist < distances.get(neighbor.target)) { 
                    distances.put(neighbor.target, newDist);
                    previous.put(neighbor.target, current.target);
                    distNode.add(new Edge(neighbor.target, newDist));
                }
            }
        }
        // After Dijkstra finishes: Check if destination is unreachable
        if (!distances.containsKey(destination) || distances.get(destination) == Integer.MAX_VALUE) {
            return new Result("No path", Integer.MAX_VALUE, operations);
        }

        // Build path: Reconstruct path by going backwards using the previous map.
        // since we are using linked list (reverse)
        LinkedList<String> pathNodes = new LinkedList<>();
        String currentNode = destination;

        while (currentNode != null && previous.containsKey(currentNode)) {
            pathNodes.addFirst(currentNode);
            currentNode = previous.get(currentNode);

        }
        // Add start node
        pathNodes.addFirst(start);

        // Convert to string
        // Convert path list to string & return result 
        String pathString = String.join(" -> ", pathNodes);

        return new Result(pathString, distances.get(destination), operations);
    }
    
    static void addEdge(Map<String, List<Edge>> map, String from, String to, int dist) {
        map.putIfAbsent(from, new LinkedList<>());
        map.get(from).add(new Edge(to, dist));
        
        //Reversed
        map.putIfAbsent(to, new LinkedList<>());
        map.get(to).add(new Edge(from, dist));
    }

    public static String neuMap()
	{
		return "";
	}

    public static void main(String[] args) {
        /*Map<String, List<Edge>> townMap = new HashMap<>();
        townMap.put("A", Arrays.asList(new Edge("B", 10), new Edge("D", 20)));
        townMap.put("B", Arrays.asList(new Edge("C", 15), new Edge ("A", 10), new Edge("E", 12)));
        townMap.put("C", Arrays.asList(new Edge("C", 8),  new Edge("B", 15),new Edge("E", 14)));;
        townMap.put("D", Arrays.asList(new Edge("E", 18), new Edge ("A", 20)));
        townMap.put("E", Arrays.asList(new Edge("C", 14), new Edge("D", 18), new Edge("B", 12)));*/

        Map<String, List<Edge>> neuMap = new HashMap<>();
        addEdge(neuMap, "A", "B", 260);
        addEdge(neuMap, "A", "D", 350);
        addEdge(neuMap, "A", "C", 250);
        addEdge(neuMap, "A", "G", 500);

        addEdge(neuMap, "B", "C", 190);
        addEdge(neuMap, "B", "F", 100);
        addEdge(neuMap, "B", "D", 180);

        addEdge(neuMap, "C", "F", 80);

        addEdge(neuMap, "D", "G", 200);
        addEdge(neuMap, "D", "E", 350);

        Result r;
        boolean searchLocation = true;
        Scanner input = new Scanner(System.in);
        String start, destintion;

        while (searchLocation == true) {
            System.out.print("Current Location: ");
            start = input.nextLine();
            System.out.print("Destination: ");
            destintion = input.nextLine();
        
            r = dijkstra(neuMap, start.toUpperCase(), destintion.toUpperCase());
            System.out.println("Path found: " + r.path);
            System.out.println("Total Distance: " + r.totalDistance + " meters");
            System.out.println();

            //Display all paths
            Set<String> visited = new HashSet<>();
            List<String> path = new ArrayList<>();
            List<List<String>> allPaths = new ArrayList<>();
            Map<List<String>, Integer> allDist = new HashMap<>();

            allPathsDFS.dfsAllPaths(neuMap, start, destintion, visited, path, allPaths, allDist, 0);
            InsertionSortDist.sort(allDist);

            /*
            for (Map.Entry<List<String>, Integer> print : allDist.entrySet()) {
                List<String> key = print.getKey();
                Integer value = print.getValue();
                System.out.println(key + " : " + value + " meters");
            }*/

            System.out.println("\nSearch for another location? (y/n)");
            String decision = input.nextLine();
            
            if ("n".equals(decision.toLowerCase())) {
                searchLocation = false;
            }
        }
    }
}
