package com.dsaa.neuway2;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NWcontroller {

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/NW")
	public NW nw(@RequestParam(defaultValue = "World") String name) {
    return new NW(counter.incrementAndGet(), String.format(template, name));
}

}
