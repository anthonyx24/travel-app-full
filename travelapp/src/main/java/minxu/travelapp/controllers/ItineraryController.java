package minxu.travelapp.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import minxu.travelapp.clients.ChatGPTClient;

@RestController
@RequestMapping("/itinerary")
public class ItineraryController {

    private final ChatGPTClient chatGPTClient;
    public ItineraryController(ChatGPTClient chatGPTClient){
        this.chatGPTClient = chatGPTClient;
    }

    @GetMapping("/getItinerary")
    public void getItinerary(){
        String prompt = "{\"destination\": \"Paris\", \"dates\": [\"2024-04-01\", \"2024-04-02\"], \"staying_location\": \"Hotel Lutetia\", \"places_to_visit\": [\"Eiffel Tower\", \"Louvre Museum\"], \"restaurants\": [\"Le Meurice\", \"L'Astrance\"], \"activities\": [\"sightseeing\", \"museums\", \"dining\"], \"exploration_time_per_day\": \"6 hours\", \"specific_requests\": \"Prefer to visit museums in the morning, relax on the last day.\"}";
        chatGPTClient.getAIResponse(prompt);
    }


    // To test: http :8080/itinerary/getItinerary
    // or curl localhost:8080/itinerary/getItinerary

}
