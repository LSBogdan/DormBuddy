package com.example.backend.service.implementation;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.URL;
import java.sql.Array;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AWSS3Service {

    @Autowired
    private S3Client s3Client;

    @Autowired
    private AmazonS3 amazonS3;

    public void addRoomPhotoToBucket(String name, String path) {

        try{
            File imageFile = new File(path);

            if(!imageFile.exists()){
                throw new FileNotFoundException("Image file not found: " + path);
            }

            String key = name + ".png";

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket("roomphotolicenta")
                    .key(key)
                    .build();

            s3Client.putObject(request, RequestBody.fromFile(imageFile));

            System.out.println("Image uploaded successfully to S3 bucket.");
        } catch (AmazonServiceException e) {
            throw new RuntimeException("Error uploading image to S3: " + e.getMessage(), e);
        } catch (FileNotFoundException e) {
            throw new IllegalArgumentException("Image file not found: " + e.getMessage(), e);
        }
    }

    public void deletePhotoFromBucket(String key) {

        try{

            String finalKey = key + ".png";

//            System.out.println(key);

            DeleteObjectRequest request = new DeleteObjectRequest("userprofilephotolicenta", finalKey);

            amazonS3.deleteObject(request);

            System.out.println("Image deleted successfully from S3 bucket.");

        } catch (AmazonServiceException e) {
            throw new RuntimeException("Error deleting image from S3:" + e.getMessage(), e);
        }
    }

    public void addObjectToBucket(String name, String path) {
        try {
            File imageFile = new File(path);
            if (!imageFile.exists()) {
                throw new FileNotFoundException("Image file not found: " + path);
            }

            String key = name + ".png";

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket("userprofilephotolicenta")
                    .key(key)
                    .build();

            s3Client.putObject(request, RequestBody.fromFile(imageFile));

            System.out.println("Image uploaded successfully to S3 bucket.");
        } catch (AmazonServiceException e) {
            throw new RuntimeException("Error uploading image to S3: " + e.getMessage(), e);
        } catch (FileNotFoundException e) {
            throw new IllegalArgumentException("Image file not found: " + e.getMessage(), e);
        }
    }
    public String generatePresignedUrlFromBucket(String key, Duration expiration) {
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest("userprofilephotolicenta", key)
                .withMethod(HttpMethod.GET)
                .withExpiration(Date.from(Instant.now().plus(expiration)));

        ResponseHeaderOverrides headerOverrides = new ResponseHeaderOverrides()
                .withCacheControl("No-cache");

        request.setResponseHeaders(headerOverrides);

        URL presignedUrl = amazonS3.generatePresignedUrl(request);

        return presignedUrl.toString();
    }
    public List<String> generatePresignedUrlForAllRoomPhotos(String key, Duration duration) {

        List<String> presignedUrlList = new ArrayList<>();

        List<S3ObjectSummary> objects = amazonS3.listObjects("roomphotolicenta", key).getObjectSummaries();

        LocalDateTime expirationDateTime = LocalDateTime.now().plus(duration);
        Date expirationDate = Date.from(expirationDateTime.atZone(ZoneId.systemDefault()).toInstant());

        for (S3ObjectSummary object : objects) {
            String objectKey = object.getKey();

            URL presignedUrl = amazonS3.generatePresignedUrl("roomphotolicenta", objectKey, expirationDate);
            presignedUrlList.add(presignedUrl.toString());
        }

        return presignedUrlList;
    }
}