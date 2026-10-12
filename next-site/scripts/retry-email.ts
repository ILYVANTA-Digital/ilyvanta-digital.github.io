import { deliverOutbox } from "../lib/contact/email.ts";
import { closeDatabase } from "../lib/contact/store.ts";
try {
  console.log(await deliverOutbox());
} finally {
  await closeDatabase();
}
