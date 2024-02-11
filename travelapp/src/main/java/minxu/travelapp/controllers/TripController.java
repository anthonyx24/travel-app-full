package minxu.travelapp.controllers;

import minxu.travelapp.models.Trip;
import minxu.travelapp.services.FirestoreTripService;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class TripController {

    FirestoreTripService firestoreTripService;
    public TripController(FirestoreTripService firestoreTripService) {
        this.firestoreTripService = firestoreTripService;
    }

    @PostMapping("/trips")
    public void createTrip(@RequestHeader("Authorization") String idToken, @RequestBody Trip trip) {
        System.out.println("Trip Name" + trip.getTripName());
        System.out.println("Destination" + trip.getDestination());
        firestoreTripService.createTrip(idToken, trip);
    }

    @GetMapping("/trips/{tripId}")
    public Trip getTrip(@RequestHeader("Authorization") String idToken, @PathVariable String tripId) {
        return firestoreTripService.getTrip(idToken, tripId);
    }

    @GetMapping("/trips")
    public List<Trip> getAllTrips(@RequestHeader("Authorization") String idToken) {
        return firestoreTripService.getAllTrips(idToken);
    }

//    @PutMapping("/update")
//    public Trip updateTrip(@RequestBody Trip trip) throws InterruptedException, ExecutionException {
//        return firestoreTripService.updateTrip(trip);
//    }
//
    @DeleteMapping("/trips/{tripId}")
    public void deleteTrip(@RequestHeader("Authorization") String idToken, @PathVariable String tripId) {
        firestoreTripService.deleteTrip(idToken, tripId);
    }

}
