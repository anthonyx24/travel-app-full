package minxu.travelapp.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
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
//    private final FirebaseAuth firebaseAuth;

    public FirestoreTripService() {
        this.db = FireStoreHelper.getFirestore();
//        this.firebaseAuth = FirebaseAuth.getInstance();
    }

    public void createTrip(String idToken, Trip trip) {
        try {
            GooglePlacesClient googlePlacesClient = new GooglePlacesClient();
            // User authentication, HTTP is stateless so just get the UID every time
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);

            Map<String, Object> data = new HashMap<>();
            data.put("tripName", trip.getTripName());

            String inputDestination = trip.getDestination();
//            String destinationId = googlePlacesClient.textSearchQuery(inputDestination);
//            String destinationInfo = googlePlacesClient.placeDetailsQuery(destinationId);
//            System.out.println("Destination Info: " + destinationInfo);
            data.put("destination", inputDestination);


            ApiFuture<DocumentReference> addedDocRef = db.collection("users").document(uid).collection("trips").add(data);
//            WriteResult result = db.collection("users").document(uid).collection("trips").document(trip.getTripName()).set(trip).get();
            System.out.println("Added trip " + trip.getTripName() + "to user " + uid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Trip getTrip(String idToken, String documentId) {
        try {
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);
            ApiFuture<DocumentSnapshot> future = db.collection("users").document(uid).collection("trips").document(documentId).get();
            DocumentSnapshot document = future.get();
            if (document.exists()){
                System.out.println("Document data: " + document.getData());
                return document.toObject(Trip.class);
            }
            else {
                System.out.println("No such document!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Trip> getAllTrips(String idToken){
        try {
            String uid = FirebaseAuthHelper.getUidFromToken(idToken);
            ApiFuture<QuerySnapshot> future = db.collection("users").document(uid).collection("trips").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            List<Trip> trips = new ArrayList<Trip>();
            for (QueryDocumentSnapshot document : documents) {
                System.out.println("Document data: " + document.getData());
                trips.add(document.toObject(Trip.class));
            }
            return trips;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }





}
