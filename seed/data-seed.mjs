import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";
import { config } from "dotenv";
config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
console.log(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);
const supabase = createClient(supabaseUrl, supabaseKey);

async function populateEvents() {
  for (let i = 0; i < 200; i++) {
    const openingHour = faker.number.int({ min: 8, max: 18 });
    const closingHour = faker.number.int({ min: openingHour + 1, max: 23 });
    const doorsopen = `${String(openingHour).padStart(2, "0")}:${String(
      faker.number.int({ min: 0, max: 59 })
    ).padStart(2, "0")}`;
    const doorsclose = `${String(closingHour).padStart(2, "0")}:${String(
      faker.number.int({ min: 0, max: 59 })
    ).padStart(2, "0")}`;

    const { error } = await supabase.from("events").insert({
      title: `Event ${i}`,
      description: faker.lorem.paragraph(),
      date: faker.date.future(),
      doorsopen,
      doorsclose,
      location: faker.location.city(),
      image: faker.image.url(),
      creator_id: "cea5bc81-f55d-4d6b-928f-4dfe026f4feb",
    });

    if (error) {
      console.error("Error inserting data:", error);
    }
  }
  console.log("Fake data inserted!");
}

populateEvents();
