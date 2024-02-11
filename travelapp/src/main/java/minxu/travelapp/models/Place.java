package minxu.travelapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Place {
    private String placeId;
    private String name;
    private String category;
//    private String image_url;
//    private String link;
//    private String address;
}
