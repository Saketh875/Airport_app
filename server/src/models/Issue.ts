import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type Sector = 'CabinCrew' | 'Sanitation' | 'Security' | 'Boarding' | 'Food' | 'Arrivals' | 'Portal';
export type Status = 'red' | 'yellow' | 'green';
export type Flow = 'staff' | 'passenger';

export interface IssueDocument extends Document {
	sector: Sector;
	category: string;
	description: string;
	status: Status;
	flow: Flow; // who reported – staff or passenger
	reporter?: Types.ObjectId;
	assignee?: Types.ObjectId;
	priority: 'normal' | 'sos';
	createdAt: Date;
	updatedAt: Date;
}

const issueSchema = new Schema<IssueDocument>(
	{
		sector: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		status: { type: String, required: true, enum: ['red', 'yellow', 'green'], default: 'red' },
		flow: { type: String, required: true, enum: ['staff', 'passenger'] },
		reporter: { type: Schema.Types.ObjectId, ref: 'User' },
		assignee: { type: Schema.Types.ObjectId, ref: 'User' },
		priority: { type: String, enum: ['normal', 'sos'], default: 'normal' },
	},
	{ timestamps: true }
);

const Issue: Model<IssueDocument> = mongoose.models.Issue || mongoose.model<IssueDocument>('Issue', issueSchema);
export default Issue;
