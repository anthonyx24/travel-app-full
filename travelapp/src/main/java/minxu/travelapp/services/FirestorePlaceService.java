package minxu.travelapp.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import minxu.travelapp.clients.GooglePlacesClient;
import minxu.travelapp.models.Place;
import minxu.travelapp.models.Trip;
import minxu.travelapp.util.FireStoreHelper;
import minxu.travelapp.util.FirebaseAuthHelper;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@DependsOn("fireStoreHelper")
public class FirestorePlaceService {
    private final Firestore db;

    public FirestorePlaceService() {
        this.db = FireStoreHelper.getFirestore();
    }

    public void createPlace(String idToken, String tripId, Place place) {
        try {
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);

            DocumentReference docRef = db.collection("users").document(uid).collection("trips").document(tripId).collection("places").document();

            Map<String, Object> data = new HashMap<>();
            data.put("placeId", docRef.getId());
            data.put("tripName", place.getName());
            data.put("destination", place.getCategory());

            ApiFuture<WriteResult> result = docRef.set(data);

            System.out.println("Added place " + place.getName() + "to trip " + tripId);
        } catch (Exception e) {
            System.out.println("Error creating place: " + e.getMessage());
        }
    }

    public Place getPlace(String idToken, String tripId, String placeId){
        try {
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);
            ApiFuture<DocumentSnapshot> future = db.collection("users").document(uid).collection("trips").document(tripId).get();
            DocumentSnapshot document = future.get();
            if (document.exists()){
                System.out.println("Place data: " + document.getData());
                return document.toObject(Place.class);
            }
            else {
                System.out.println("No place exists with that placeId");
            }
        } catch (Exception e) {
            System.out.println("Error getting place: " + e.getMessage());
        }
        return null;
    }

    public List<Place> getAllPlaces(String idToken, String tripId) {
        try {
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);
            ApiFuture<QuerySnapshot> future = db.collection("users").document(uid).collection("trips").document(tripId).collection("places").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            List<Place> places = new ArrayList<>();
            for (QueryDocumentSnapshot document : documents) {
                places.add(document.toObject(Place.class));
            }
            return places;
        } catch (Exception e) {
            System.out.println("Error getting all places: " + e.getMessage());
        }
        return null;
    }

    public void deletePlace(String idToken, String tripId, String placeId) {
        try {
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);
            ApiFuture<WriteResult> writeResult = db.collection("users").document(uid).collection("trips").document(tripId).collection("places").document(placeId).delete();
            System.out.println("Place with placeId " + placeId + " has been deleted");
        } catch (Exception e) {
            System.out.println("Error deleting place: " + e.getMessage());
        }
    }


}
