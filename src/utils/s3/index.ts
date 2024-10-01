import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl} from '@aws-sdk/s3-request-presigner'


const s3Client = new S3Client({
  region: process.env.AWS_REGION, // Corrected the environment variable name
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string, // Corrected this part
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string, // Corrected this part
  },
});

async function putObjectURL(userId: string, fileName: string, imageType: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: 'bucket-media-dev',
    Key: `uploads/${userId}/tweets/${fileName}-${Date.now()}`,
    ContentType: imageType
  });
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
  return signedUrl;
}

async function deleteS3Object(key:string){
    const command=new DeleteObjectCommand({
        Bucket:'bucket-media-dev',
        Key:key
    })
    await s3Client.send(command)
  }
export { putObjectURL,deleteS3Object };
