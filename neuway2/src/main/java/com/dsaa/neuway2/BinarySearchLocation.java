package com.dsaa.neuway2;

import java.util.List;

//Since locations are sorted by distance
public class BinarySearchLocation {
    static String binarySearch(List<String> key, String target) {
        int l = 0, h = key.size()-1;

        while (l <= h) {
            int m = l + (h - l)/ 2;
             int isTarget = target.compareTo(key.get(m));

            if (isTarget == 0) 
                return key.get(m);  

            if (isTarget > 0) {
                l = m + 1;
            } else {
                h = m - 1;
            }
        }
        return "Not found"; 
    }

    public static void main(String[] args){
        
    }
}

