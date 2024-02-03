package minxu.travelapp.clients;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.json.JSONObject;

import java.util.HashMap;

@Component
public class GooglePlacesClient {

    private static final String TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
    private static final String PLACE_DETAILS_URL = "https://places.googleapis.com/v1/places/";

    @Value("${google.apikey}")
    private String API_KEY;

    public String textSearchQuery(String textQuery){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Goog-Api-Key", API_KEY);
        headers.set("X-Goog-FieldMask", "places.id");

        HashMap<String, String> requestBody = new HashMap<>();
        requestBody.put("textQuery", textQuery);

        HttpEntity<HashMap<String, String>> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(TEXT_SEARCH_URL, request, String.class);

        return response.getBody();
    }

    public String placeDetailsQuery(String placeId){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Goog-Api-Key", API_KEY);
        headers.set("X-Goog-FieldMask", "id, displayName, formattedAddress");

        String url = PLACE_DETAILS_URL + placeId;
        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

        return response.getBody();
    }
}
