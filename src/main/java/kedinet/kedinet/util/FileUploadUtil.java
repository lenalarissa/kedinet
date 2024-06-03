package kedinet.kedinet.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileUploadUtil {

    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        String newFileName = fileName;

        int counter = 1;
        while (Files.exists(filePath)) {
            String fileBaseName = fileName.substring(0, fileName.lastIndexOf('.'));
            String fileExtension = fileName.substring(fileName.lastIndexOf('.'));
            newFileName = fileBaseName + "_" + counter + fileExtension;
            filePath = uploadPath.resolve(newFileName);
            counter++;
        }

        try (var outputStream = Files.newOutputStream(filePath)) {
            outputStream.write(multipartFile.getBytes());
        } catch (IOException e) {
            throw new IOException("Could not save image file: " + newFileName, e);
        }
    }
}
