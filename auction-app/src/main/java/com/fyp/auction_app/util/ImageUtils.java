package com.fyp.auction_app.util;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;

public class ImageUtils {

    public static byte[] compressImage(byte[] imageData, String formatName, float quality) throws IOException {
        ByteArrayInputStream inputStream = new ByteArrayInputStream(imageData);
        BufferedImage image = ImageIO.read(inputStream);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(outputStream);
        ImageWriter writer = ImageIO.getImageWritersByFormatName(formatName).next();
        writer.setOutput(imageOutputStream);

        ImageWriteParam param = writer.getDefaultWriteParam();
        if (param.canWriteCompressed()) {
            param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            param.setCompressionQuality(quality);  // quality ranges from 0.0 to 1.0
        }

        writer.write(null, new IIOImage(image, null, null), param);
        writer.dispose();
        imageOutputStream.close();

        return outputStream.toByteArray();
    }
}
