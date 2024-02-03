package minxu.travelapp.clients;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.json.JSONObject;

@Component
public class ChatGPTClient {

    private static final String CREATE_ASSISTANT_URL = "https://api.openai.com/v1/assistants";
    private static final String CREATE_THREAD_URL = "https://api.openai.com/v1/threads";

    @Value("${openai.apikey}")
    private String API_KEY;

    private String assistantId;
    private String threadId;

    public void createAssistant() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.set("OpenAI-Beta", "assistants=v1");

        String requestBody = "{"
                + "\"model\": \"gpt-3.5-turbo\", "
                + "\"name\": \"Itinerary Generator\", "
                + "\"instructions\": \"Generate a travel itinerary in JSON format based on user inputs. "
                + "The user will always input the same JSON format with the required fields 'destination' and 'dates', "
                + "and then optional fields 'staying_location' (where the user is staying), "
                + "'places_to_visit' (places/restaurants user wants added to the itinerary), "
                + "'activities' (certain activities such as museums, sightseeing, hiking, etc that the user wants to do), "
                + "'exploration_time_per_day' (the time in hours that the user wants to spend out in a day), "
                + "'specific_requests' (other specific requests that the user has, such as price range, "
                + "which days should be reserved for what, how far are they willing to travel from the place they are staying, etc).\\n"
                + "The output should be a JSON string with the following structure:\\n"
                + "{\\n"
                + "  'itinerary': [\\n"
                + "    {\\n"
                + "      'date': 'YYYY-MM-DD',\\n"
                + "      'places': [\\n"
                + "        {\\n"
                + "          'name': 'Place Name',\\n"
                + "          'category': 'Category',\\n"
                + "          'time_to_spend': 'Duration to spend there',\\n"
                + "          'description': 'Short description of the place'\\n"
                + "        },\\n"
                + "        ...\\n"
                + "      ]\\n"
                + "    },\\n"
                + "    ...\\n"
                + "  ]\\n"
                + "}"
                + "\\nInclude all user-specified places, restaurants, and activities, filling in additional suggestions as needed. "
                + "Make sure the total time spent per day aligns with the user-specified time spent exploring per day "
                + "(if they filled in that field).\""
                + "}";

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(CREATE_ASSISTANT_URL, request, String.class);

        try {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            this.assistantId = jsonResponse.getString("id");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void createThread() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.set("OpenAI-Beta", "assistants=v1");

        HttpEntity<String> request = new HttpEntity<>("{}", headers);
        ResponseEntity<String> response = restTemplate.postForEntity(CREATE_THREAD_URL, request, String.class);

        try {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            this.threadId = jsonResponse.getString("id");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void getAIResponse(String prompt) {
        if (this.assistantId == null || this.threadId == null) {
            createAssistant();
            createThread();
        }

        String createMessageURL = "https://api.openai.com/v1/threads/" + this.threadId + "/messages";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.set("OpenAI-Beta", "assistants=v1");

        String requestBody = "{"
                + "\"role\": \"user\", "
                + "\"content\": \"" + prompt.replace("\"", "\\\"") + "\" "
                + "}";

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(createMessageURL, request, String.class);

        System.out.println("Raw JSON response: " + response.getBody());

        // Now create a run for that message
        String createRunURL = "https://api.openai.com/v1/threads/" + this.threadId + "/runs";
        JSONObject runRequestBody = new JSONObject();
        runRequestBody.put("assistant_id", this.assistantId);

        HttpEntity<String> runRequest = new HttpEntity<>(runRequestBody.toString(), headers);
        ResponseEntity<String> runResponse = restTemplate.postForEntity(createRunURL, runRequest, String.class);

        String runId = new JSONObject(runResponse.getBody()).getString("id");
        System.out.println("Run ID: " + runId);

        String runStatus = "in_progress";
// Loop to periodically check the run status
        while (!runStatus.equals("completed")) {
            // URL to check the run status
            String checkRunStatusURL = "https://api.openai.com/v1/threads/" + this.threadId + "/runs/" + runId;

            ResponseEntity<String> statusResponse = restTemplate.exchange(checkRunStatusURL, HttpMethod.GET, new HttpEntity<>(headers), String.class);

            // Extract the run status from the response
            runStatus = new JSONObject(statusResponse.getBody()).getString("status");
            System.out.println("Run status: " + runStatus);

            // Check if the run status is not in progress, then break the loop
            if (!runStatus.equals("in_progress")) {
                break;
            }

            // Delay before the next status check (e.g., 5 seconds)
            try {
                Thread.sleep(2000);
                System.out.println("Checking run status...");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    String getMessagesURL = "https://api.openai.com/v1/threads/" + this.threadId + "/messages";
    ResponseEntity<String> messagesResponse = restTemplate.exchange(getMessagesURL, HttpMethod.GET, new HttpEntity<>(headers), String.class);
    System.out.println("Updated Messages: " + messagesResponse.getBody());








//        if (response.getStatusCode() == HttpStatus.OK) {
//            try {
//                JSONObject jsonResponse = new JSONObject(response.getBody());
//                JSONArray messages = jsonResponse.getJSONArray("messages");
//                for (int i = messages.length() - 1; i >= 0; i--) {
//                    JSONObject message = messages.getJSONObject(i);
//                    if ("assistant".equals(message.getString("role"))) {
//                        return message.getString("content");
//                    }
//                }
//                return "No assistant response found";
//            } catch (Exception e) {
//                e.printStackTrace();
//                return "Error processing the AI response";
//            }
//        } else {
//            return "Error: " + response.getStatusCode();
//        }
    }
}



