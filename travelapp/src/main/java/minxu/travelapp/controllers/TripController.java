package minxu.travelapp.controllers;

import minxu.travelapp.models.Trip;
import minxu.travelapp.services.FirestoreTripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class TripController {

    FirestoreTripService firestoreTripService;
    public TripController(FirestoreTripService firestoreTripService) {
        this.firestoreTripService = firestoreTripService;
    }

    @PostMapping("/trips/create")
    public void createTrip(@RequestHeader("Authorization") String idToken, @RequestBody Trip trip) {
        System.out.println("Trip Name" + trip.getTripName());
        System.out.println("Destination" + trip.getDestination());
        firestoreTripService.createTrip(idToken, trip);
    }

    @GetMapping("/trips/get")
    public Trip getTrip(@RequestHeader("Authorization") String idToken, @RequestBody String documentId) {
        return firestoreTripService.getTrip(idToken, documentId);
    }

    @GetMapping("/trips/getAll")
    public List<Trip> getAllTrips(@RequestHeader("Authorization") String idToken) {
        return firestoreTripService.getAllTrips(idToken);
    }


//
//    @PutMapping("/update")
//    public Trip updateTrip(@RequestBody Trip trip) throws InterruptedException, ExecutionException {
//        return firestoreTripService.updateTrip(trip);
//    }
//
//    @PutMapping("/delete")
//    public Trip deleteTrip(@RequestBody String documentId) throws InterruptedException, ExecutionException {
//        return firestoreTripService.deleteTrip(documentId);
//    }

}
