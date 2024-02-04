package minxu.travelapp.util;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.io.InputStream;

@Component
public class FireStoreHelper {
    static Firestore db;
    static boolean _initialized;

    public static void InitializeFirestore(){
        if(_initialized) return;
        try {
            // Use a service account
            InputStream serviceAccount = FireStoreHelper.class.getClassLoader().getResourceAsStream("minxu-travel-app-firebase-adminsdk-to42v-70e96ce413.json");
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(credentials)
                    .setProjectId("minxu-travel-app")
                    .build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
            db = FirestoreClient.getFirestore();
            _initialized = true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalStateException("Failed to initialize Firestore", e);
        }
    }

    @PostConstruct
    public void init() {
        InitializeFirestore();
    }

    public static Firestore getFirestore() {
        return db;
    }

}
