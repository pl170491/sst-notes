import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamodb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Notes.tableName,
    // 'Key' defines the partition key and sort key of
    // the item to be retrieved
    Key: {
      userId: "123",
      noteId: event?.pathParameters?.id,
    },
  };

  const result = await dynamodb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return JSON.stringify(result.Item);
});
