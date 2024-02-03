package minxu.travelapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//        (exclude = {org.springframework.ai.autoconfigure.bedrock.llama2.BedrockLlama2AutoConfiguration.class})
public class TravelappApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelappApplication.class, args);
    }

}
