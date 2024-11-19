import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryProps from "@/utils/interface/category";
import { DialogClose } from "../ui/dialog";

const Category = ({ categories, setSelectedCategory, prices }: CategoryProps) => {
  const [selectedTab, setSelectedTab] = useState(categories[0].value);

  return (
    <Tabs defaultValue={selectedTab} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        {categories.map((category) => (
          <TabsTrigger
            key={category.value}
            value={category.value}
            onClick={() => {
              setSelectedTab(category.value);
            }}
          >
            {category.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent key={category.value} value={category.value}>
          <Card>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div>
                <p className="text-xl font-bold">
                  Price: ${prices[category.value as keyof typeof prices]}
                </p>
              </div>
              <div>
                <p className="font-semibold">Benefits:</p>
                <ul className="list-disc ml-5">
                  {category.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <DialogClose asChild>
                <Button onClick={() => setSelectedCategory(category)}>
                  Select {category.title}
                </Button>
              </DialogClose>
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Category;
