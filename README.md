# AWS S3 Demo

This project demonstrates how to interact with AWS S3 in a Spring Boot application, including file upload, download, and generating presigned URLs for file access.

## Prerequisites

Before running this project, ensure that you have the following:

- **AWS Account**: You need an AWS account to set up the S3 bucket and IAM credentials.
- **Java 17**: This project is built using Java 17.
- **Maven**: Use Maven to build and run the project.
- **Spring Boot**: The project is built using Spring Boot.

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/aws-s3-demo.git
```

### 2. Setup AWS Credentials

In order to interact with AWS S3, you'll need to configure AWS credentials:

- **AWS Access Key**: Create an IAM user with programmatic access and assign appropriate permissions.
- **AWS Secret Key**: Download the IAM user's secret key.

### 3. Configure Application Properties

In the `src/main/resources/application.properties` or `application.yml`, provide your AWS configuration.

Example for `application.properties`:

```properties
spring.application.name=s3-demo

# AWS S3 Configuration
aws.s3.bucket-name=my-test-app-bucket
aws.s3.bucket-url=https://my-test-app-bucket.s3.amazonaws.com
aws.s3.region=us-west-2

# AWS Credentials
aws.credentials.access-key=YOUR_ACCESS_KEY
aws.credentials.secret-key=YOUR_SECRET_KEY
```

### 4. Set Up IAM Policy

You need to create an IAM policy with the following permissions and attach it to your IAM user.

IAM Policy (Example):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-test-app-bucket",
        "arn:aws:s3:::my-test-app-bucket/*"
      ]
    }
  ]
}
```

### 5. Set Up Bucket Policy

In order to make the files publicly accessible, you need to modify the bucket's policy to allow public read access.

Bucket Policy (Example):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

Replace `your-bucket-name` with the actual name of your S3 bucket.

### 6. Build and Run the Application

Build and run the project using Maven:

```bash
mvn clean install
mvn spring-boot:run
```

The application will be running at `http://localhost:8080`. You can use this to upload and download files to/from your S3 bucket.

## Endpoints

### **Upload a File**
- **URL**: `/api/files/upload`
- **Method**: `POST`
- **Body**: Form-data (file)
- **Description**: Upload a file to the S3 bucket.

### **Download a File**
- **URL**: `/api/files/download/{fileName}`
- **Method**: `GET`
- **Description**: Download a file from the S3 bucket using the file name.

### **Generate Presigned URL**
- **URL**: `/api/files/generate-presigned-url/{fileName}`
- **Method**: `GET`
- **Description**: Generate a presigned URL for downloading a file from the S3 bucket.

## AWS S3 Configuration

Ensure that the S3 bucket has the necessary permissions:

1. **Bucket Policy**: Allows public read access.
2. **IAM Policy**: Ensures your IAM user has permission to upload, download, and list objects in the bucket.
