-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_shipmentId_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
