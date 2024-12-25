import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
	{
		gameName: {
			type: String,
			required: true,
			trim: true,
			maxLength: 80,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		score: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{
		timestamps: true,
	}
);

const ScoreModel = mongoose.model('Score', scoreSchema);
export default ScoreModel;
