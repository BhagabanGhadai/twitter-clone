-- CreateEnum
CREATE TYPE "LoginType" AS ENUM ('GOOGLE', 'EMAIL_PASSWORD');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "profileImageUrl" TEXT,
    "loginType" "LoginType" NOT NULL DEFAULT 'EMAIL_PASSWORD',
    "forgotPasswordOtp" INTEGER,
    "forgotPasswordExpiry" TIMESTAMP(3),
    "emailVerificationOTP" INTEGER,
    "emailVerificationExpiry" TIMESTAMP(3),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
