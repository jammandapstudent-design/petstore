package com.petstore.config;

import com.petstore.model.Pet;
import com.petstore.repository.PetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(PetRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                    new Pet(null, "Buddy", "Golden Retriever", "Dog", 1200.0, "A friendly and loyal Golden Retriever puppy.", "https://images.unsplash.com/photo-1552053831-71594a27632d"),
                    new Pet(null, "Luna", "Siamese", "Cat", 800.0, "Elegant Siamese cat with beautiful blue eyes.", "https://images.unsplash.com/photo-1513245543132-31f507417b26"),
                    new Pet(null, "Charlie", "Beagle", "Dog", 950.0, "Energetic Beagle who loves to play and sniff.", "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8"),
                    new Pet(null, "Bella", "Persian", "Cat", 1100.0, "Fluffy Persian cat looking for a quiet home.", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"),
                    new Pet(null, "Max", "German Shepherd", "Dog", 1500.0, "Intelligent and protective German Shepherd puppy.", "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95"),
                    new Pet(null, "Milo", "Maine Coon", "Cat", 1300.0, "Large and gentle Maine Coon cat.", "https://images.unsplash.com/photo-1533738363-b7f9aef128ce"),
                    new Pet(null, "Oliver", "Parrot", "Bird", 500.0, "Colorful and talkative parrot.", "https://images.unsplash.com/photo-1552728089-57bdde30fc3b"),
                    new Pet(null, "Daisy", "Cockatiel", "Bird", 200.0, "Sweet and whistly cockatiel.", "https://images.unsplash.com/photo-1522926127302-5940429ed6ae")
                ));
            }
        };
    }
}
