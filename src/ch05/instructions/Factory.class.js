/**
 * @author: HuRuiFeng
 * @file: Factory.class.js
 * @time: 2019/10/17 23:33
 * @desc: 根据操作码创建具体的指令
 */

let format = require('string-format');
format.extend(String.prototype);
const GOTO_W = require("./extended/Gotow.class").GOTO_W;
const IFNONNULL = require("./extended/Ifnull.class").IFNONNULL;
const IFNULL = require("./extended/Ifnull.class").IFNULL;
const WIDE = require("./extended/Wide.class").WIDE;
const LOOKUP_SWITCH = require("./control/Lookupswitch.class").LOOKUP_SWITCH;
const TABLE_SWITCH = require("./control/Tableswitch.class").TABLE_SWITCH;
const GOTO = require("./control/Goto.class").GOTO;
const IF_ACMPNE = require("./comparisons/Ifacmp.class").IF_ACMPNE;
const IF_ACMPEQ = require("./comparisons/Ifacmp.class").IF_ACMPEQ;
const IF_ICMPLE = require("./comparisons/Ificmp.class").IF_ICMPLE;
const IF_ICMPGT = require("./comparisons/Ificmp.class").IF_ICMPGT;
const IF_ICMPGE = require("./comparisons/Ificmp.class").IF_ICMPGE;
const IF_ICMPLT = require("./comparisons/Ificmp.class").IF_ICMPLT;
const IF_ICMPNE = require("./comparisons/Ificmp.class").IF_ICMPNE;
const IF_ICMPEQ = require("./comparisons/Ificmp.class").IF_ICMPEQ;
const IFLE = require("./comparisons/Ifcond.class").IFLE;
const IFGT = require("./comparisons/Ifcond.class").IFGT;
const IFGE = require("./comparisons/Ifcond.class").IFGE;
const IFLT = require("./comparisons/Ifcond.class").IFLT;
const IFNE = require("./comparisons/Ifcond.class").IFNE;
const IFEQ = require("./comparisons/Ifcond.class").IFEQ;
const DCMPG = require("./comparisons/Dcmp.class").DCMPG;
const DCMPL = require("./comparisons/Dcmp.class").DCMPL;
const FCMPG = require("./comparisons/Fcmp.class").FCMPG;
const FCMPL = require("./comparisons/Fcmp.class").FCMPL;
const LCMP = require("./comparisons/Lcmp.class").LCMP;
const I2S = require("./conversions/I2x.class").I2S;
const I2C = require("./conversions/I2x.class").I2C;
const I2B = require("./conversions/I2x.class").I2B;
const D2F = require("./conversions/D2x.class").D2F;
const D2L = require("./conversions/D2x.class").D2L;
const D2I = require("./conversions/D2x.class").D2I;
const F2D = require("./conversions/F2x.class").F2D;
const F2L = require("./conversions/F2x.class").F2L;
const F2I = require("./conversions/F2x.class").F2I;
const L2D = require("./conversions/L2x.class").L2D;
const L2F = require("./conversions/L2x.class").L2F;
const L2I = require("./conversions/L2x.class").L2I;
const I2D = require("./conversions/I2x.class").I2D;
const I2F = require("./conversions/I2x.class").I2F;
const I2L = require("./conversions/I2x.class").I2L;
const IINC = require("./math/Iinc.class").IINC;
const IXOR = require("./math/Xor.class").IXOR;
const LXOR = require("./math/Xor.class").LXOR;
const LOR = require("./math/Or.class").LOR;
const IOR = require("./math/Or.class").IOR;
const LAND = require("./math/And.class").LAND;
const IAND = require("./math/And.class").IAND;
const LUSHR = require("./math/Sh.class").LUSHR;
const IUSHR = require("./math/Sh.class").IUSHR;
const LSHR = require("./math/Sh.class").LSHR;
const ISHR = require("./math/Sh.class").ISHR;
const LSHL = require("./math/Sh.class").LSHL;
const ISHL = require("./math/Sh.class").ISHL;
const DNEG = require("./math/Neg.class").DNEG;
const FNEG = require("./math/Neg.class").FNEG;
const LNEG = require("./math/Neg.class").LNEG;
const INEG = require("./math/Neg.class").INEG;
const DREM = require("./math/Rem.class").DREM;
const FREM = require("./math/Rem.class").FREM;
const LREM = require("./math/Rem.class").LREM;
const IREM = require("./math/Rem.class").IREM;
const DDIV = require("./math/Div.class").DDIV;
const FDIV = require("./math/Div.class").FDIV;
const LDIV = require("./math/Div.class").LDIV;
const IDIV = require("./math/Div.class").IDIV;
const DMUL = require("./math/Mul.class").DMUL;
const FMUL = require("./math/Mul.class").FMUL;
const LMUL = require("./math/Mul.class").LMUL;
const IMUL = require("./math/Mul.class").IMUL;
const DSUB = require("./math/Sub.class").DSUB;
const FSUB = require("./math/Sub.class").FSUB;
const LSUB = require("./math/Sub.class").LSUB;
const ISUB = require("./math/Sub.class").ISUB;
const DADD = require("./math/Add.class").DADD;
const FADD = require("./math/Add.class").FADD;
const LADD = require("./math/Add.class").LADD;
const IADD = require("./math/Add.class").IADD;
const SWAP = require("./stack/Swap.class").SWAP;
const DUP2_X2 = require("./stack/Dup.class").DUP2_X2;
const DUP2_X1 = require("./stack/Dup.class").DUP2_X1;
const DUP2 = require("./stack/Dup.class").DUP2;
const DUP_X2 = require("./stack/Dup.class").DUP_X2;
const DUP_X1 = require("./stack/Dup.class").DUP_X1;
const DUP = require("./stack/Dup.class").DUP;
const POP2 = require("./stack/Pop.class").POP2;
const POP = require("./stack/Pop.class").POP;
const ASTORE_3 = require("./stores/Astore.class").ASTORE_3;
const ASTORE_2 = require("./stores/Astore.class").ASTORE_2;
const ASTORE_1 = require("./stores/Astore.class").ASTORE_1;
const ASTORE_0 = require("./stores/Astore.class").ASTORE_0;
const DSTORE_3 = require("./stores/Dstore.class").DSTORE_3;
const DSTORE_2 = require("./stores/Dstore.class").DSTORE_2;
const DSTORE_1 = require("./stores/Dstore.class").DSTORE_1;
const DSTORE_0 = require("./stores/Dstore.class").DSTORE_0;
const FSTORE_3 = require("./stores/Fstore.class").FSTORE_3;
const FSTORE_2 = require("./stores/Fstore.class").FSTORE_2;
const FSTORE_1 = require("./stores/Fstore.class").FSTORE_1;
const FSTORE_0 = require("./stores/Fstore.class").FSTORE_0;
const LSTORE_3 = require("./stores/Lstore.class").LSTORE_3;
const LSTORE_2 = require("./stores/Lstore.class").LSTORE_2;
const LSTORE_1 = require("./stores/Lstore.class").LSTORE_1;
const LSTORE_0 = require("./stores/Lstore.class").LSTORE_0;
const ISTORE_3 = require("./stores/Istore.class").ISTORE_3;
const ISTORE_2 = require("./stores/Istore.class").ISTORE_2;
const ISTORE_1 = require("./stores/Istore.class").ISTORE_1;
const ISTORE_0 = require("./stores/Istore.class").ISTORE_0;
const ASTORE = require("./stores/Astore.class").ASTORE;
const DSTORE = require("./stores/Dstore.class").DSTORE;
const FSTORE = require("./stores/Fstore.class").FSTORE;
const LSTORE = require("./stores/Lstore.class").LSTORE;
const ISTORE = require("./stores/Istore.class").ISTORE;
const ALOAD_3 = require("./loads/Aload.class").ALOAD_3;
const ALOAD_2 = require("./loads/Aload.class").ALOAD_2;
const ALOAD_1 = require("./loads/Aload.class").ALOAD_1;
const ALOAD_0 = require("./loads/Aload.class").ALOAD_0;
const DLOAD_3 = require("./loads/Dload.class").DLOAD_3;
const DLOAD_2 = require("./loads/Dload.class").DLOAD_2;
const DLOAD_1 = require("./loads/Dload.class").DLOAD_1;
const DLOAD_0 = require("./loads/Dload.class").DLOAD_0;
const FLOAD_3 = require("./loads/Fload.class").FLOAD_3;
const FLOAD_2 = require("./loads/Fload.class").FLOAD_2;
const FLOAD_1 = require("./loads/Fload.class").FLOAD_1;
const FLOAD_0 = require("./loads/Fload.class").FLOAD_0;
const LLOAD_3 = require("./loads/Lload.class").LLOAD_3;
const LLOAD_2 = require("./loads/Lload.class").LLOAD_2;
const LLOAD_1 = require("./loads/Lload.class").LLOAD_1;
const LLOAD_0 = require("./loads/Lload.class").LLOAD_0;
const ILOAD_3 = require("./loads/Iload.class").ILOAD_3;
const ILOAD_2 = require("./loads/Iload.class").ILOAD_2;
const ILOAD_1 = require("./loads/Iload.class").ILOAD_1;
const ILOAD_0 = require("./loads/Iload.class").ILOAD_0;
const ALOAD = require("./loads/Aload.class").ALOAD;
const DLOAD = require("./loads/Dload.class").DLOAD;
const FLOAD = require("./loads/Fload.class").FLOAD;
const LLOAD = require("./loads/Lload.class").LLOAD;
const ILOAD = require("./loads/Iload.class").ILOAD;
const SIPUSH = require("./constants/Ipush.class").SIPUSH;
const BIPUSH = require("./constants/Ipush.class").BIPUSH;
const DCONST_1 = require("./constants/Const.class").DCONST_1;
const DCONST_0 = require("./constants/Const.class").DCONST_0;
const FCONST_2 = require("./constants/Const.class").FCONST_2;
const FCONST_1 = require("./constants/Const.class").FCONST_1;
const FCONST_0 = require("./constants/Const.class").FCONST_0;
const LCONST_1 = require("./constants/Const.class").LCONST_1;
const LCONST_0 = require("./constants/Const.class").LCONST_0;
const ICONST_5 = require("./constants/Const.class").ICONST_5;
const ICONST_4 = require("./constants/Const.class").ICONST_4;
const ICONST_3 = require("./constants/Const.class").ICONST_3;
const ICONST_2 = require("./constants/Const.class").ICONST_2;
const ICONST_1 = require("./constants/Const.class").ICONST_1;
const ICONST_0 = require("./constants/Const.class").ICONST_0;
const ICONST_M1 = require("./constants/Const.class").ICONST_M1;
const ACONST_NULL = require("./constants/Const.class").ACONST_NULL;
const NOP = require("./constants/Nop.class").NOP;

class Factory {
    static new_instruction(opcode) {

        switch (opcode) {
            case 0x00:
                return new NOP();
            case 0x01:
                return new ACONST_NULL();
            case 0x02:
                return new ICONST_M1();
            case 0x03:
                return new ICONST_0();
            case 0x04:
                return new ICONST_1();
            case 0x05:
                return new ICONST_2();
            case 0x06:
                return new ICONST_3();
            case 0x07:
                return new ICONST_4();
            case 0x08:
                return new ICONST_5();
            case 0x09:
                return new LCONST_0();
            case 0x0a:
                return new LCONST_1();
            case 0x0b:
                return new FCONST_0();
            case 0x0c:
                return new FCONST_1();
            case 0x0d:
                return new FCONST_2();
            case 0x0e:
                return new DCONST_0();
            case 0x0f:
                return new DCONST_1();
            case 0x10:
                return new BIPUSH();
            case 0x11:
                return new SIPUSH();

            case 0x15:
                return new ILOAD();
            case 0x16:
                return new LLOAD();
            case 0x17:
                return new FLOAD();
            case 0x18:
                return new DLOAD();
            case 0x19:
                return new ALOAD();
            case 0x1a:
                return new ILOAD_0();
            case 0x1b:
                return new ILOAD_1();
            case 0x1c:
                return new ILOAD_2();
            case 0x1d:
                return new ILOAD_3();
            case 0x1e:
                return new LLOAD_0();
            case 0x1f:
                return new LLOAD_1();
            case 0x20:
                return new LLOAD_2();
            case 0x21:
                return new LLOAD_3();
            case 0x22:
                return new FLOAD_0();
            case 0x23:
                return new FLOAD_1();
            case 0x24:
                return new FLOAD_2();
            case 0x25:
                return new FLOAD_3();
            case 0x26:
                return new DLOAD_0();
            case 0x27:
                return new DLOAD_1();
            case 0x28:
                return new DLOAD_2();
            case 0x29:
                return new DLOAD_3();
            case 0x2a:
                return new ALOAD_0();
            case 0x2b:
                return new ALOAD_1();
            case 0x2c:
                return new ALOAD_2();
            case 0x2d:
                return new ALOAD_3();

            case 0x36:
                return new ISTORE();
            case 0x37:
                return new LSTORE();
            case 0x38:
                return new FSTORE();
            case 0x39:
                return new DSTORE();
            case 0x3a:
                return new ASTORE();
            case 0x3b:
                return new ISTORE_0();
            case 0x3c:
                return new ISTORE_1();
            case 0x3d:
                return new ISTORE_2();
            case 0x3e:
                return new ISTORE_3();
            case 0x3f:
                return new LSTORE_0();
            case 0x40:
                return new LSTORE_1();
            case 0x41:
                return new LSTORE_2();
            case 0x42:
                return new LSTORE_3();
            case 0x43:
                return new FSTORE_0();
            case 0x44:
                return new FSTORE_1();
            case 0x45:
                return new FSTORE_2();
            case 0x46:
                return new FSTORE_3();
            case 0x47:
                return new DSTORE_0();
            case 0x48:
                return new DSTORE_1();
            case 0x49:
                return new DSTORE_2();
            case 0x4a:
                return new DSTORE_3();
            case 0x4b:
                return new ASTORE_0();
            case 0x4c:
                return new ASTORE_1();
            case 0x4d:
                return new ASTORE_2();
            case 0x4e:
                return new ASTORE_3();

            case 0x57:
                return new POP();
            case 0x58:
                return new POP2();
            case 0x59:
                return new DUP();
            case 0x5a:
                return new DUP_X1();
            case 0x5b:
                return new DUP_X2();
            case 0x5c:
                return new DUP2();
            case 0x5d:
                return new DUP2_X1();
            case 0x5e:
                return new DUP2_X2();
            case 0x5f:
                return new SWAP();
            case 0x60:
                return new IADD();
            case 0x61:
                return new LADD();
            case 0x62:
                return new FADD();
            case 0x63:
                return new DADD();
            case 0x64:
                return new ISUB();
            case 0x65:
                return new LSUB();
            case 0x66:
                return new FSUB();
            case 0x67:
                return new DSUB();
            case 0x68:
                return new IMUL();
            case 0x69:
                return new LMUL();
            case 0x6a:
                return new FMUL();
            case 0x6b:
                return new DMUL();
            case 0x6c:
                return new IDIV();
            case 0x6d:
                return new LDIV();
            case 0x6e:
                return new FDIV();
            case 0x6f:
                return new DDIV();
            case 0x70:
                return new IREM();
            case 0x71:
                return new LREM();
            case 0x72:
                return new FREM();
            case 0x73:
                return new DREM();
            case 0x74:
                return new INEG();
            case 0x75:
                return new LNEG();
            case 0x76:
                return new FNEG();
            case 0x77:
                return new DNEG();
            case 0x78:
                return new ISHL();
            case 0x79:
                return new LSHL();
            case 0x7a:
                return new ISHR();
            case 0x7b:
                return new LSHR();
            case 0x7c:
                return new IUSHR();
            case 0x7d:
                return new LUSHR();
            case 0x7e:
                return new IAND();
            case 0x7f:
                return new LAND();
            case 0x80:
                return new IOR();
            case 0x81:
                return new LOR();
            case 0x82:
                return new IXOR();
            case 0x83:
                return new LXOR();
            case 0x84:
                return new IINC();
            case 0x85:
                return new I2L();
            case 0x86:
                return new I2F();
            case 0x87:
                return new I2D();
            case 0x88:
                return new L2I();
            case 0x89:
                return new L2F();
            case 0x8a:
                return new L2D();
            case 0x8b:
                return new F2I();
            case 0x8c:
                return new F2L();
            case 0x8d:
                return new F2D();
            case 0x8e:
                return new D2I();
            case 0x8f:
                return new D2L();
            case 0x90:
                return new D2F();
            case 0x91:
                return new I2B();
            case 0x92:
                return new I2C();
            case 0x93:
                return new I2S();
            case 0x94:
                return new LCMP();
            case 0x95:
                return new FCMPL();
            case 0x96:
                return new FCMPG();
            case 0x97:
                return new DCMPL();
            case 0x98:
                return new DCMPG();
            case 0x99:
                return new IFEQ();
            case 0x9a:
                return new IFNE();
            case 0x9b:
                return new IFLT();
            case 0x9c:
                return new IFGE();
            case 0x9d:
                return new IFGT();
            case 0x9e:
                return new IFLE();
            case 0x9f:
                return new IF_ICMPEQ();
            case 0xa0:
                return new IF_ICMPNE();
            case 0xa1:
                return new IF_ICMPLT();
            case 0xa2:
                return new IF_ICMPGE();
            case 0xa3:
                return new IF_ICMPGT();
            case 0xa4:
                return new IF_ICMPLE();
            case 0xa5:
                return new IF_ACMPEQ();
            case 0xa6:
                return new IF_ACMPNE();
            case 0xa7:
                return new GOTO();

            case 0xaa:
                return new TABLE_SWITCH();
            case 0xab:
                return new LOOKUP_SWITCH();

            case 0xc4:
                return new WIDE();

            case 0xc6:
                return new IFNULL();
            case 0xc7:
                return new IFNONNULL();
            case 0xc8:
                return new GOTO_W();
            default:
                throw new Error("Unsupported opcode: 0x{0}!".format(opcode.toString(16)));
        }

    }
}

exports.Factory = Factory;