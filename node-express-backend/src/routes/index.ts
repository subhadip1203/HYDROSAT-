import { Router } from 'express';

// Auth middleware
import {internalAuthMiddleware} from '../middlewares/auth/internalAuth';
import {jwtAuthMiddleware} from '../middlewares/auth/jwtToken';

// Validator middleware
import { validateFeedback } from '../middlewares/validators/feedback.validator';
import { validateSentiment } from '../middlewares/validators/sentiment.validator';
import { validateAuthLogin } from '../middlewares/validators/login.validator';

// Controllers
import { submitFeedbackController } from '../controllers/feedback.controller';
import { updateSentimentController } from '../controllers/sentiment.controller';
import { loginController } from '../controllers/authLogin.controller';
import { adminFeedbackController } from '../controllers/adminFeedback.controller';

const router = Router();

router.get('/', (req,res)=> { res.send('API is running') });
router.post('/feedback', validateFeedback, submitFeedbackController);
router.patch('/internal/sentiment', internalAuthMiddleware, validateSentiment, updateSentimentController);

// Admin routes
router.post('/admin/auth/login', validateAuthLogin, loginController )
router.get('/admin/feedbacks', jwtAuthMiddleware, adminFeedbackController )


export default router;