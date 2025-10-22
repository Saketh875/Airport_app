import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'staff' | 'passenger';

export interface UserDocument extends Document {
	name: string;
	email: string;
	passwordHash: string;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true, index: true },
		passwordHash: { type: String, required: true },
		role: { type: String, required: true, enum: ['staff', 'passenger'] },
	},
	{ timestamps: true }
);

const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
export default User;
