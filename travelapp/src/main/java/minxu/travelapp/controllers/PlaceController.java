package minxu.travelapp.controllers;

import minxu.travelapp.models.Place;
import minxu.travelapp.services.FirestorePlaceService;
import minxu.travelapp.services.FirestoreTripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class PlaceController {

    FirestorePlaceService firestorePlaceService;
    public PlaceController(FirestorePlaceService firestorePlaceService) {
        this.firestorePlaceService = firestorePlaceService;
    }

    @PostMapping("/trips/{tripId}/places")
    public void createPlace(@RequestHeader("Authorization") String idToken, @PathVariable String tripId, @RequestBody Place place) {
        System.out.println("Place Name: " + place.getName());
        System.out.println("Category: " + place.getCategory());
        firestorePlaceService.createPlace(idToken, tripId, place);
    }

    @GetMapping("/trips/{tripId}/places/{placeId}")
    public Place getPlace(@RequestHeader("Authorization") String idToken, @PathVariable String tripId, @PathVariable String placeId) {
        return firestorePlaceService.getPlace(idToken, tripId, placeId);
    }

    @GetMapping("/trips/{tripId}/places")
    public List<Place> getAllPlaces(@RequestHeader("Authorization") String idToken, @PathVariable String tripId) {
        return firestorePlaceService.getAllPlaces(idToken, tripId);
    }

    @DeleteMapping("trips/{tripId}/places/{placeId}")
    public void deletePlace(@RequestHeader("Authorization") String idToken, @PathVariable String tripId, @PathVariable String placeId) {
        firestorePlaceService.deletePlace(idToken, tripId, placeId);
    }
}
