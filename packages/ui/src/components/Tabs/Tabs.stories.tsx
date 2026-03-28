import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../Card/Card";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

const meta: Meta = { title: "Data Display/Tabs", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" style={{ width: "400px" }}>
      <TabsList style={{ width: "100%" }}>
        <TabsTrigger value="account" style={{ flex: 1 }}>Account</TabsTrigger>
        <TabsTrigger value="password" style={{ flex: 1 }}>Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader><CardTitle>Account</CardTitle><CardDescription>Make changes to your account here.</CardDescription></CardHeader>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Input label="Name" defaultValue="Jane Doe" />
            <Input label="Username" defaultValue="@jane_doe" />
          </CardContent>
          <CardFooter><Button>Save changes</Button></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader><CardTitle>Password</CardTitle><CardDescription>Change your password here.</CardDescription></CardHeader>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Input label="Current password" type="password" />
            <Input label="New password" type="password" />
          </CardContent>
          <CardFooter><Button>Save password</Button></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
