package com.petstore.service;

import com.petstore.model.Pet;
import com.petstore.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public List<Pet> getPetsByCategory(String category) {
        return petRepository.findByCategory(category);
    }

    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }

    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }

    public Pet updatePet(Long id, Pet petDetails) {
        Pet pet = petRepository.findById(id).orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
        pet.setName(petDetails.getName());
        pet.setBreed(petDetails.getBreed());
        pet.setCategory(petDetails.getCategory());
        pet.setPrice(petDetails.getPrice());
        pet.setDescription(petDetails.getDescription());
        pet.setImageUrl(petDetails.getImageUrl());
        return petRepository.save(pet);
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}
