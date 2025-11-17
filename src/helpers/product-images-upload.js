const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/aws-s3");
const { ProductsImages } = require("../models");
require("dotenv").config();

async function uploadFileToS3(file) {
  const fileName = `products/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file.buffer,
    ContectType: file.mimetype,
    ACL: "public-read",
  });

  await s3Client.send(command);

  const region = process.env.AWS_REGION;
  const url = `https://${process.env.AWS_S3_BUCKET}.s3.${region}.amazonaws.com/${fileName}`;

  return url;
}

/**
 * Processa upload de múltiplas images para o S3
 * @param {Array} files - Array de arquivos a serem enviados
 * @returns {Promise<Array>} - Array de arquivos processados
 */
async function processMultipleImagesUpload(files) {
  if (!files || files.lenth === 0) {
    return [];
  }

  const uploadPromises = files.map((file) => uploadFileToS3(file));
  const urls = await Promise.all(uploadPromises);

  return urls;
}

/**
 * Salva as imagens na tabela ProductsImages
 * @param {String} productId - ID do producto
 * @param {Array} urls - Array de URLs das imagens
 * @returns {Promise<Array>} - Array de imagens salva
 */
async function saveProductsImages(productId, urls) {
  if (!urls || urls.length === 0) {
    return [];
  }

  const imagesData = urls.map((image) => ({
    product_id: productId,
    url: image,
  }));

  const savedImages = await ProductsImages.bulkCreate(imagesData);
  return savedImages;
}

/**
 * Processa upload completo: faz upload no s3 e salva no banco
 * @param {String} productId
 * @param {Array} files - Array de arquivos
 * @returns {Promises<Array>} - Array de imagens salvas
 */
async function uploadAndSaveProductsImages(productId, files) {
  try {
    const urls = await processMultipleImagesUpload(files);

    const images = await saveProductsImages(productId, urls);

    return images;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  uploadAndSaveProductsImages,
  saveProductsImages,
  processMultipleImagesUpload,
};
