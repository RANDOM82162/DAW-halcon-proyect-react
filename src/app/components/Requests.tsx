import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function Requests() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Submit a Request</h2>
        <p className="text-gray-600">Send inquiries or requests to the project team</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form className="space-y-5">
          <div>
            <label htmlFor="request-type" className="block text-gray-700 mb-2">
              Request Type
            </label>
            <Select>
              <SelectTrigger id="request-type" className="w-full">
                <SelectValue placeholder="Select a request type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="technical">Technical Question</SelectItem>
                <SelectItem value="payment">Payment Issue</SelectItem>
                <SelectItem value="schedule">Schedule Update</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Brief summary of your request"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
              placeholder="Provide detailed information about your request..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              Submit Request
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-900">
          <strong>Note:</strong> Your request will be reviewed by our team within 24-48 business hours. You will receive a response via email.
        </p>
      </div>
    </div>
  );
}
