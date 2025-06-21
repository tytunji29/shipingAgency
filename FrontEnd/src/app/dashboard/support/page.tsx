"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import Loader from "@/components/Icon/Loader";

export default function SupportPage() {
  const { state, submitTicket, getTickets } = useAppContext();
  const [repage, setRepage] = useState(0);
  const [history, setHistory] = useState<any>([{}]);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });

  const allTickets = async () => {
    const allTickets = await getTickets();
    setHistory(allTickets);
  };

  const onTicketSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const submit: any = await submitTicket(formData);
    if (submit?.status === true) {
      setRepage(Math.random());
    }
  };

  useEffect(() => {
    allTickets();
  }, [repage]);

  return (
    <div className="max-w-xl py-8 px-4">
      <h1 className="text-xl font-semibold text-slate-700 mb-6">Support</h1>
      <p className="text-sm text-[#64748B] mb-6">
        Need help? Fill out the form below, and our support team will get back
        to you as soon as possible.
      </p>

      <form action="/success" className="space-y-4" onSubmit={onTicketSubmit}>
        <div>
          <Input
            type="text"
            placeholder="Subject"
            className="w-full text-xs"
            onChange={(e) =>
              setFormData(() => ({ ...formData, subject: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <Textarea
            placeholder="Describe your issue in detail..."
            className="min-h-[150px] w-full text-xs"
            onChange={(e) =>
              setFormData(() => ({ ...formData, description: e.target.value }))
            }
            required
          />
        </div>
        <div className="flex justify-end mt-6">
          <CustomButton
            type="submit"
            bgVariant="black"
            textVariant="primary"
            disabled={state.loading && true}
            title={state.loading ? <Loader /> : "Submit Ticket"}
            className="rounded-md w-full max-w-[14rem]"
          />
        </div>
      </form>

      <Separator className="my-10" />

      <div className="border-y-[1px] ">
        <h2 className="text-sm font-semibold text-slate-700 my-6">
          Recent Support Tickets
        </h2>
        <div className="space-y-4">
          {history.map((ticket: any) => {
            return (
              <div
                key={ticket.date}
                className="flex items-center justify-between"
              >
                <div className="text-sm text-[#64748B] ">
                  {ticket.date} - {ticket.comment}
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    ticket.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-50 text-green-700"
                  } border-none`}
                >
                  {ticket.status}
                </Badge>
              </div>
            );
          })}
          {/* <div className="flex items-center justify-between pb-6">
            <div className="text-sm text-[#64748B]">
              15/02/2025 - Delay in shipment delivery
            </div>
            <Badge
              variant="outline"
              className="bg-amber-50 text-[#CA8A04] border-none"
            >
              Pending
            </Badge>
          </div> */}
        </div>
      </div>
    </div>
  );
}
