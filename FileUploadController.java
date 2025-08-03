package com.csvvalidator.controller;

import com.csvvalidator.model.ValidationError;
import com.csvvalidator.model.ValidationResponse;
import com.csvvalidator.service.CsvValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FileUploadController {

    @Autowired
    private CsvValidationService csvValidationService;

    @PostMapping("/upload")
    public ResponseEntity<ValidationResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file is not empty
            if (file.isEmpty()) {
                ValidationResponse response = new ValidationResponse("error", 
                    List.of(new ValidationError(0, "Please select a file to upload")));
                return ResponseEntity.badRequest().body(response);
            }

            // Validate file is CSV
            String filename = file.getOriginalFilename();
            if (filename == null || !filename.toLowerCase().endsWith(".csv")) {
                ValidationResponse response = new ValidationResponse("error", 
                    List.of(new ValidationError(0, "Please upload a CSV file")));
                return ResponseEntity.badRequest().body(response);
            }

            // Validate CSV content
            List<ValidationError> errors = csvValidationService.validateCsvFile(file);
            
            if (errors.isEmpty()) {
                ValidationResponse response = new ValidationResponse("success", errors);
                return ResponseEntity.ok(response);
            } else {
                ValidationResponse response = new ValidationResponse("error", errors);
                return ResponseEntity.ok(response);
            }

        } catch (Exception e) {
            ValidationResponse response = new ValidationResponse("error", 
                List.of(new ValidationError(0, "Error processing file: " + e.getMessage())));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
