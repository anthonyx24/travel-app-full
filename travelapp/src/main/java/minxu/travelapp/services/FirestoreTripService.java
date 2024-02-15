package minxu.travelapp.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import minxu.travelapp.clients.GooglePlacesClient;
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
public class FirestoreTripService {

    private final Firestore db;

    public FirestoreTripService() {
        this.db = FireStoreHelper.getFirestore();
    }

    public void createTrip(String idToken, Trip trip) {
        try {
            GooglePlacesClient googlePlacesClient = new GooglePlacesClient();
            // User authentication, HTTP is stateless so just get the UID every time
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);

            DocumentReference docRef =  db.collection("users").document(uid).collection("trips").document();

            Map<String, Object> data = new HashMap<>();
            data.put("tripId", docRef.getId());
            data.put("tripName", trip.getTripName());

            String inputDestination = trip.getDestination();
//            String destinationId = googlePlacesClient.textSearchQuery(inputDestination);
//            String destinationInfo = googlePlacesClient.placeDetailsQuery(destinationId);
//            System.out.println("Destination Info: " + destinationInfo);
            data.put("destination", inputDestination);


            ApiFuture<WriteResult> result = docRef.set(data);
//            WriteResult result = db.collection("users").document(uid).collection("trips").document(trip.getTripName()).set(trip).get();
            System.out.println("Added trip " + trip.getTripName() + "to user " + uid);
        } catch (Exception e) {
            System.out.println("Error creating trip: " + e.getMessage());
        }
    }

    public Trip getTrip(String idToken, String tripId) {
        try {
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);
            ApiFuture<DocumentSnapshot> future = db.collection("users").document(uid).collection("trips").document(tripId).get();
            DocumentSnapshot document = future.get();
            if (document.exists()){
                System.out.println("Trip data: " + document.getData());
                return document.toObject(Trip.class);
            }
            else {
                System.out.println("No trip exists with that tripId");
            }
        } catch (Exception e) {
            System.out.println("Error getting trip: " + e.getMessage());
        }
        return null;
    }

    public List<Trip> getAllTrips(String idToken){
        try {
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);
            ApiFuture<QuerySnapshot> future = db.collection("users").document(uid).collection("trips").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            List<Trip> trips = new ArrayList<>();
            for (QueryDocumentSnapshot document : documents) {
                System.out.println("Document data: " + document.getData());
                trips.add(document.toObject(Trip.class));
            }
            return trips;
        } catch (Exception e) {
            System.out.println("Error getting all trips: " + e.getMessage());
        }
        return null;
    }

    public void deleteTrip(String idToken, String tripId) {
        try {
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);
            deletePlacesFromTrip(uid, tripId);
            ApiFuture<WriteResult> writeResult = db.collection("users").document(uid).collection("trips").document(tripId).delete();
            System.out.println("Deleted trip with tripId: " + tripId);
        } catch (Exception e) {
            System.out.println("Error deleting trip: " + e.getMessage());
        }
    }

    public void deletePlacesFromTrip(String uid, String tripId) {
        try {
            ApiFuture<QuerySnapshot> future = db.collection("users").document(uid).collection("trips").document(tripId).collection("places").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                System.out.print("Deleted place with placeId: " + document.getId());
                document.getReference().delete();
            }
        } catch (Exception e) {
            System.out.println("Error deleting places from trip: " + e.getMessage());
        }
    }





}
