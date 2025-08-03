package com.csvvalidator.service;

import com.csvvalidator.model.ValidationError;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvValidationService {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public List<ValidationError> validateCsvFile(MultipartFile file) throws IOException, CsvException {
        List<ValidationError> errors = new ArrayList<>();
        
        try (CSVReader csvReader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            List<String[]> records = csvReader.readAll();
            
            // Skip header row if present
            boolean hasHeader = records.size() > 0 && isHeaderRow(records.get(0));
            int startRow = hasHeader ? 1 : 0;
            
            for (int i = startRow; i < records.size(); i++) {
                String[] record = records.get(i);
                int rowNumber = i + 1; // 1-based row numbering
                
                // Validate row has at least 2 columns
                if (record.length < 2) {
                    errors.add(new ValidationError(rowNumber, "Row must have at least 2 columns (Name, DateOfBirth)"));
                    continue;
                }
                
                String name = record[0] != null ? record[0].trim() : "";
                String dateOfBirth = record[1] != null ? record[1].trim() : "";
                
                // Validate Name
                if (name.isEmpty()) {
                    errors.add(new ValidationError(rowNumber, "Name must not be empty"));
                }
                
                // Validate DateOfBirth
                if (dateOfBirth.isEmpty()) {
                    errors.add(new ValidationError(rowNumber, "DateOfBirth must not be empty"));
                } else if (!isValidDate(dateOfBirth)) {
                    errors.add(new ValidationError(rowNumber, "Invalid date format. Expected yyyy-MM-dd"));
                }
            }
        }
        
        return errors;
    }
    
    private boolean isHeaderRow(String[] row) {
        if (row.length >= 2) {
            String firstCol = row[0] != null ? row[0].trim().toLowerCase() : "";
            String secondCol = row[1] != null ? row[1].trim().toLowerCase() : "";
            return firstCol.equals("name") && secondCol.equals("dateofbirth");
        }
        return false;
    }
    
    private boolean isValidDate(String dateStr) {
        try {
            LocalDate.parse(dateStr, DATE_FORMATTER);
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }
}
