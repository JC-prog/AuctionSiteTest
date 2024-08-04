package com.fyp.auction_app.util;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;

public class ImageUtils {

    public static byte[] compressImage(byte[] imageData, String formatName, float quality) throws IOException {
        ByteArrayInputStream inputStream = new ByteArrayInputStream(imageData);
        BufferedImage image = ImageIO.read(inputStream);

        // Create a compressed version of the image
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(image, formatName, outputStream);

        return outputStream.toByteArray();
    }
}
