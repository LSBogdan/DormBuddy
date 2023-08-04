package com.example.backend.controller;

import com.example.backend.service.implementation.AWSS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/v1/s3")

public class AWSS3Controller {

    @Autowired
    private AWSS3Service s3Service;


    @PostMapping("/objects/{name}/{path}")
    public ResponseEntity<String> addObjectToBucket(
            @PathVariable String name,
            @PathVariable String path
    ) {
        String finalPath = "C:/S3Images/" + path;

        try {
            s3Service.addObjectToBucket(name, finalPath);
            return ResponseEntity.ok("Object added to bucket successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add object to bucket: " + e.getMessage());
        }
    }

    @DeleteMapping("/{key}")
    public void deleteUserProfile(@PathVariable String key) {

//        System.out.println("Incep stergerea");
        s3Service.deletePhotoFromBucket(key);

    }

    @PostMapping("/room/{name}/{path}")
    public ResponseEntity<String> addRoomPhotoToBucket(
            @PathVariable String name,
            @PathVariable String path
    ) {
        String finalPath = "C:/S3Images/" + path;
//        System.out.println("Am intrat pe room controller");
//        System.out.println("name = " + name);
//        System.out.println("path = " + path);


        try{
            s3Service.addRoomPhotoToBucket(name, finalPath);
            return ResponseEntity.ok("Object added to bucket successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add object to bucket: " + e.getMessage());
        }
    }


    @GetMapping("/all/{key}")
    public List<String> generatePresignedUrlForAllRoomPhotos(@PathVariable String key) {

        Duration duration = Duration.ofDays(1);

        List<String> pregisnedUrList = s3Service.generatePresignedUrlForAllRoomPhotos(key, duration);

//        System.out.println(pregisnedUrList.toString());

        return pregisnedUrList;
    }

    @GetMapping("/{key}")
    public String generatePresignedUrlFromBucket(@PathVariable String key) {

        Duration duration = Duration.ofDays(1);

        String presignedUr = s3Service.generatePresignedUrlFromBucket(key, duration);

//        System.out.println("presignedUr = " + presignedUr);

        return  presignedUr;
    }

}