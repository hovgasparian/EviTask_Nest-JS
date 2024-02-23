export class CreateProductsDto {
  readonly productName: string;
  readonly description: string;
  readonly price: number;
  img_url?: string;
}
