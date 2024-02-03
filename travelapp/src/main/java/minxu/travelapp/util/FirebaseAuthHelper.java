package minxu.travelapp.util;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

public class FirebaseAuthHelper {
    // Authentication tokens are generated every time a user logs in
    // FirebaseAuth uses JWTs, or JSON Web Tokens, to authenticate users
    public static String getUidFromToken(String idToken) {
        try {
            String[] parts = idToken.split(" ");
            String token = parts[1];
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            return decodedToken.getUid();
        } catch (Exception e) {
            throw new RuntimeException("Error verifying Firebase ID token", e);
        }
    }

}
