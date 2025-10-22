import { Router } from 'express';
import Issue from '../models/Issue';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
	const { status, sector, flow } = req.query as { status?: string; sector?: string; flow?: string };
	const q: any = {};
	if (status) q.status = status;
	if (sector) q.sector = sector;
	if (flow) q.flow = flow;
	const issues = await Issue.find(q).sort({ createdAt: -1 }).limit(200);
	res.json(issues);
});

router.post('/report', requireAuth, async (req, res) => {
	try {
		const { sector, category, description, flow } = req.body as { sector: string; category: string; description: string; flow: 'staff' | 'passenger' };
		const issue = await Issue.create({ sector, category, description, flow, status: 'red', reporter: req.user?.userId });
		res.status(201).json(issue);
	} catch (_err) {
		res.status(400).json({ message: 'Could not create issue' });
	}
});

router.post('/:id/take', requireAuth, async (req, res) => {
	const { id } = req.params;
	const issue = await Issue.findByIdAndUpdate(id, { status: 'yellow', assignee: req.user?.userId }, { new: true });
	if (!issue) return res.status(404).json({ message: 'Not found' });
	res.json(issue);
});

router.post('/:id/resolve', requireAuth, async (req, res) => {
	const { id } = req.params;
	const issue = await Issue.findByIdAndUpdate(id, { status: 'green' }, { new: true });
	if (!issue) return res.status(404).json({ message: 'Not found' });
	res.json(issue);
});

router.post('/sos', requireAuth, async (req, res) => {
	const { sector, description } = req.body as { sector: string; description: string };
	const issue = await Issue.create({ sector, category: 'SOS', description, status: 'red', flow: 'staff', priority: 'sos', reporter: req.user?.userId });
	res.status(201).json(issue);
});

export default router;
