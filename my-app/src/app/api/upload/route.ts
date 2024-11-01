import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT || "",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: Request) {
  const url = new URL(request.url);
  const count = url.searchParams.get("count");

  if (!count) {
    return Response.json(
      { message: "Missing count parameter" },
      { status: 400 }
    );
  }

  const keys = Array.from({ length: Number(count) }, () => v4());

  const urls = await Promise.all(
    keys.map((key) =>
      getSignedUrl(
        s3,
        new PutObjectCommand({
          Bucket: "test",
          Key: key,
          ACL: "public-read",
        }),
        {
          expiresIn: 60 * 60,
        }
      )
    )
  );
  return Response.json({
    uploadUrls: urls,
    accessUrls: keys.map((key) => ({
      url: process.env.NEXT_PUBLIC_API_R2_PUB_URL + key,
    })),
  });
}
